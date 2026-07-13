import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function DashboardPage() {
  const { user, token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };

const filteredTasks = tasks.filter((task) => {
  const matchesSearch = task.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    task.status === statusFilter;
    const matchesPriority =
  priorityFilter === "All" ||
  task.priority === priorityFilter;

  return (
  matchesSearch &&
  matchesStatus &&
  matchesPriority
);
});
  const totalTasks = filteredTasks.length;

  const pendingTasks = filteredTasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = filteredTasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await axiosClient.get("/tasks", {
        headers,
      });

      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setEditingTask(null);

    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post(
        "/tasks",
        formData,
        {
          headers,
        }
      );

      resetForm();

      fetchTasks();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to create task"
      );
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);

    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate
        ? task.dueDate.substring(0, 10)
        : "",
    });
  };
    const updateTask = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.put(
        `/tasks/${editingTask._id}`,
        formData,
        {
          headers,
        }
      );

      resetForm();

      fetchTasks();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to update task"
      );
    }
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await axiosClient.delete(
        `/tasks/${id}`,
        {
          headers,
        }
      );

      fetchTasks();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to delete task"
      );
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axiosClient.patch(
        `/tasks/${id}/status`,
        { status },
        {
          headers,
        }
      );

      fetchTasks();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to update status"
      );
    }
  };

  const submitHandler = editingTask
    ? updateTask
    : createTask;
    return (
    <Card>

      <h1>Dashboard</h1>

      <h3>Welcome {user?.name}</h3>

      <hr />

      <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>

      <form onSubmit={submitHandler}>

        <Input
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <Input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <br />
        <br />

        <Input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <br />
        <br />

        <Button type="submit">
          {editingTask ? "Update Task" : "Create Task"}
        </Button>

        {editingTask && (
          <>
            {" "}
            <Button
              type="button"
              onClick={resetForm}
            >
              Cancel
            </Button>
          </>
        )}

      </form>

      <hr />

      <h2>Search Task</h2>

      <Input
        placeholder="Search by task title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
<br />

<select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
  <option value="All">All Tasks</option>

  <option value="Pending">Pending</option>

  <option value="In Progress">
    In Progress
  </option>

  <option value="Completed">
    Completed
  </option>
</select>
<br />
<br />

<select
  value={priorityFilter}
  onChange={(e) => setPriorityFilter(e.target.value)}
>
  <option value="All">
    All Priorities
  </option>

  <option value="Low">
    Low
  </option>

  <option value="Medium">
    Medium
  </option>

  <option value="High">
    High
  </option>
</select>

      <br />
      <br />

      <hr />

     <h2>Dashboard Statistics</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "20px",
  }}
>

  <Card>
    <h3>📋 Total</h3>
    <h1>{totalTasks}</h1>
  </Card>

  <Card>
    <h3>⏳ Pending</h3>
    <h1>{pendingTasks}</h1>
  </Card>

  <Card>
    <h3>🔄 In Progress</h3>
    <h1>{inProgressTasks}</h1>
  </Card>

  <Card>
    <h3>✅ Completed</h3>
    <h1>{completedTasks}</h1>
  </Card>

</div>

      <hr />

      <h2>My Tasks</h2>
            {loading ? (
        <p>Loading...</p>
      ) : filteredTasks.length === 0 ? (
        <p>No Tasks Found</p>
      ) : (
        filteredTasks.map((task) => (
          <Card key={task._id}>

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              <strong>Priority:</strong> {task.priority}
            </p>

            <p>
              <strong>Status:</strong> {task.status}
            </p>

            <p>
              <strong>Due Date:</strong>{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "Not Set"}
            </p>

            <br />

            <select
              value={task.status}
              onChange={(e) =>
                updateStatus(task._id, e.target.value)
              }
            >
              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

            <br />
            <br />

            <Button
              type="button"
              onClick={() => startEdit(task)}
            >
              Edit
            </Button>

            {" "}

            <Button
              type="button"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </Button>

            <hr />

          </Card>
        ))
      )}

    </Card>
  );
}

export default DashboardPage;