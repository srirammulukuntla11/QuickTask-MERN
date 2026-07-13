import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import Card from "../components/common/Card";

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
      <Card>
        <h2>Loading Admin Dashboard...</h2>
      </Card>
    );
  }

  return (
    <Card>

      <h1>Admin Dashboard</h1>

      <hr />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "15px",
          marginTop: "20px",
        }}
      >

        <Card>
          <h3>👥 Users</h3>
          <h1>{stats.totalUsers}</h1>
        </Card>

        <Card>
          <h3>📋 Tasks</h3>
          <h1>{stats.totalTasks}</h1>
        </Card>

        <Card>
          <h3>⏳ Pending</h3>
          <h1>{stats.pendingTasks}</h1>
        </Card>

        <Card>
          <h3>🔄 Progress</h3>
          <h1>{stats.inProgressTasks}</h1>
        </Card>

        <Card>
          <h3>✅ Completed</h3>
          <h1>{stats.completedTasks}</h1>
        </Card>

      </div>

      <hr />
            <h2>Quick Actions</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >

        <Card
          style={{
            flex: 1,
            textAlign: "center",
          }}
        >
          <h3>👥 Manage Users</h3>

          <p>
            View all registered users and remove users if necessary.
          </p>
        </Card>

        <Card
          style={{
            flex: 1,
            textAlign: "center",
          }}
        >
          <h3>📋 Manage Tasks</h3>

          <p>
            View every task in the system and delete unwanted tasks.
          </p>
        </Card>

      </div>

      <hr />

      <h2>System Summary</h2>

      <Card>
        <p><strong>Total Users:</strong> {stats.totalUsers}</p>
        <p><strong>Total Tasks:</strong> {stats.totalTasks}</p>
        <p><strong>Pending:</strong> {stats.pendingTasks}</p>
        <p><strong>In Progress:</strong> {stats.inProgressTasks}</p>
        <p><strong>Completed:</strong> {stats.completedTasks}</p>
      </Card>
          </Card>

  );
}

export default AdminDashboardPage;