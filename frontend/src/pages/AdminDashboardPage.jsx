import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

function AdminDashboardPage() {
  const { token } = useContext(AuthContext);

  const [stats, setStats] = useState(null);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchStats = async () => {
    try {
      const response = await axiosClient.get(
        "/admin/stats",
        {
          headers,
        }
      );

      setStats(response.data.stats);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl font-semibold">
          Loading Admin Dashboard...
        </h2>
      </div>
    );
  }

  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: "👥",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Tasks",
      value: stats.totalTasks,
      icon: "📋",
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: "⏳",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: "🚀",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: "✅",
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-700 to-blue-600 p-8 text-white shadow-xl">

        <h1 className="text-5xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-blue-100">
          Monitor users, tasks and system activity.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className={`rounded-2xl bg-gradient-to-r ${card.color} text-white p-6 shadow-xl hover:scale-105 transition duration-300`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/80">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {card.value}
                </h2>

              </div>

              <div className="text-5xl">
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

          <div className="text-5xl mb-4">
            👥
          </div>

          <h2 className="text-2xl font-bold">
            Manage Users
          </h2>

          <p className="text-gray-500 mt-3">
            View all registered users, monitor accounts and remove users when required.
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

          <div className="text-5xl mb-4">
            📋
          </div>

          <h2 className="text-2xl font-bold">
            Manage Tasks
          </h2>

          <p className="text-gray-500 mt-3">
            Monitor all tasks created by users across the application.
          </p>

        </div>

      </div>

      {/* Summary */}

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-3xl font-bold mb-6">
          System Summary
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="bg-slate-100 rounded-xl p-5">
            <strong>Total Users:</strong> {stats.totalUsers}
          </div>

          <div className="bg-slate-100 rounded-xl p-5">
            <strong>Total Tasks:</strong> {stats.totalTasks}
          </div>

          <div className="bg-slate-100 rounded-xl p-5">
            <strong>Pending Tasks:</strong> {stats.pendingTasks}
          </div>

          <div className="bg-slate-100 rounded-xl p-5">
            <strong>Completed Tasks:</strong> {stats.completedTasks}
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboardPage;