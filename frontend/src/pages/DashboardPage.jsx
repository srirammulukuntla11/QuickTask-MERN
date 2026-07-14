import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatsCards";
import TaskForm from "../components/dashboard/TaskForm";
import TaskFilters from "../components/dashboard/TaskFilters";
import TaskList from "../components/dashboard/TaskList";

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

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await axiosClient.get(
        "/tasks",
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

    if (
      !window.confirm(
        "Delete this task?"
      )
    )
      return;

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

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axiosClient.patch(
        `/tasks/${id}/status`,
        {
          status,
        },
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

  const filteredTasks = tasks.filter(
    (task) => {

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        task.status ===
          statusFilter;

      const matchesPriority =
        priorityFilter ===
          "All" ||
        task.priority ===
          priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    }
  );

  const submitHandler = editingTask
    ? updateTask
    : createTask;

  return (

    <div className="space-y-8">

      <DashboardHeader
        user={user}
      />

      <StatsCards
        totalTasks={
          filteredTasks.length
        }
        pendingTasks={
          filteredTasks.filter(
            (t) =>
              t.status ===
              "Pending"
          ).length
        }
        inProgressTasks={
          filteredTasks.filter(
            (t) =>
              t.status ===
              "In Progress"
          ).length
        }
        completedTasks={
          filteredTasks.filter(
            (t) =>
              t.status ===
              "Completed"
          ).length
        }
      />

      <TaskForm
        editingTask={editingTask}
        formData={formData}
        handleChange={handleChange}
        submitHandler={
          submitHandler
        }
        resetForm={resetForm}
      />

      <TaskFilters
        search={search}
        setSearch={setSearch}
        statusFilter={
          statusFilter
        }
        setStatusFilter={
          setStatusFilter
        }
        priorityFilter={
          priorityFilter
        }
        setPriorityFilter={
          setPriorityFilter
        }
      />

      <TaskList
        loading={loading}
        filteredTasks={
          filteredTasks
        }
        startEdit={startEdit}
        deleteTask={deleteTask}
        updateStatus={
          updateStatus
        }
      />

    </div>

  );
}

export default DashboardPage;