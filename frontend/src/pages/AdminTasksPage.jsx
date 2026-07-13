import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function AdminTasksPage() {
  const { token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchTasks = async () => {
    try {
      const response = await axiosClient.get(
        "/admin/tasks",
        {
          headers,
        }
      );

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

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await axiosClient.delete(
        `/admin/tasks/${id}`,
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

  const filteredTasks = tasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <h2>Loading Tasks...</h2>
      </Card>
    );
  }

  return (
    <Card>

      <h1>Manage Tasks</h1>

      <hr />

      <Input
        placeholder="Search task..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <br />
      <br />

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >

        <thead>

          <tr>

            <th>Title</th>

            <th>User</th>

            <th>Status</th>

            <th>Priority</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredTasks.map((task) => (

            <tr key={task._id}>

              <td>{task.title}</td>

              <td>
                {task.user?.name}
              </td>

              <td>{task.status}</td>

              <td>{task.priority}</td>

              <td>

                <Button
                  type="button"
                  onClick={() =>
                    deleteTask(task._id)
                  }
                >
                  Delete
                </Button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </Card>
  );
}

export default AdminTasksPage;