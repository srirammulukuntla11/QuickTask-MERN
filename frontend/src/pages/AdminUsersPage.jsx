import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

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
      const response = await axiosClient.get(
        "/admin/users",
        { headers }
      );

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

    if (!window.confirm("Delete this user?"))
      return;

    try {

      await axiosClient.delete(
        `/admin/users/${id}`,
        { headers }
      );

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
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl font-semibold">
          Loading Users...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-white shadow-xl">

        <h1 className="text-5xl font-bold">
          Manage Users
        </h1>

        <p className="mt-3 text-blue-100">
          Search and manage all registered users.
        </p>

      </div>

      {/* Search */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <Input
          placeholder="Search by name or email..."
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
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Joined
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr
                  key={user._id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-semibold">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="p-4">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">

                    <Button
                      type="button"
                      onClick={() =>
                        deleteUser(user._id)
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

export default AdminUsersPage;