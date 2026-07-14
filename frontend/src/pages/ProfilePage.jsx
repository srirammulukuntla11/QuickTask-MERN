import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

function ProfilePage() {
  const { token } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchProfile = async () => {
    try {
      const response = await axiosClient.get(
        "/auth/me",
        {
          headers,
        }
      );

      setUser(response.data.user);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-xl font-semibold">
          Loading Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl shadow-xl p-8 text-white">

        <div className="flex flex-col md:flex-row items-center gap-8">

          <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-6xl">

            👤

          </div>

          <div>

            <p className="text-blue-100 text-lg">
              Welcome Back 👋
            </p>

            <h1 className="text-5xl font-bold mt-2">
              {user.name}
            </h1>

            <p className="text-blue-100 mt-3">
              Manage your account information.
            </p>

          </div>

        </div>

      </div>

      {/* Information */}

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-3xl font-bold mb-8">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-gray-50 rounded-2xl p-6">

            <p className="text-gray-500">
              Full Name
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {user.name}
            </h3>

          </div>

          <div className="bg-gray-50 rounded-2xl p-6">

            <p className="text-gray-500">
              Email
            </p>

            <h3 className="text-xl font-semibold mt-2 break-all">
              {user.email}
            </h3>

          </div>

          <div className="bg-gray-50 rounded-2xl p-6">

            <p className="text-gray-500">
              Role
            </p>

            <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold capitalize">
              {user.role}
            </span>

          </div>

          <div className="bg-gray-50 rounded-2xl p-6">

            <p className="text-gray-500">
              Member Since
            </p>

            <h3 className="text-xl font-semibold mt-2">
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </h3>

          </div>

        </div>

      </div>

      {/* User ID */}

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-5">
          User ID
        </h2>

        <div className="bg-gray-100 rounded-xl p-4 break-all font-mono">

          {user._id}

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;