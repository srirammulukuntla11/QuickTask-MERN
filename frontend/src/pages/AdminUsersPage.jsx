import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function AdminUsersPage() {
  const { token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosClient.get("/admin/users", {
        headers,
      });

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axiosClient.delete(`/admin/users/${id}`, {
        headers,
      });

      fetchUsers();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete user"
      );
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <h2>Loading Users...</h2>
      </Card>
    );
  }

  return (
    <Card>
      <h1>Manage Users</h1>

      <hr />

      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </td>

              <td>
                <Button
                  type="button"
                  onClick={() =>
                    deleteUser(user._id)
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

export default AdminUsersPage;