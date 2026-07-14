import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

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
        { headers }
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

    if (!window.confirm("Delete this task?"))
      return;

    try {

      await axiosClient.delete(
        `/admin/tasks/${id}`,
        { headers }
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
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl font-semibold">
          Loading Tasks...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-xl">

        <h1 className="text-5xl font-bold">
          Manage Tasks
        </h1>

        <p className="mt-3 text-emerald-100">
          View and manage every task created in the system.
        </p>

      </div>

      {/* Search */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <Input
          placeholder="Search task..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  User
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Priority
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTasks.map((task) => (

                <tr
                  key={task._id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-semibold">
                    {task.title}
                  </td>

                  <td className="p-4">
                    {task.user?.name}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>

                  </td>

                  <td className="p-4 text-center">

                    <Button
                      type="button"
                      onClick={() =>
                        deleteTask(task._id)
                      }
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </Button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminTasksPage;