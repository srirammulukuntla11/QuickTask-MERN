import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function MainLayout({ children }) {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <header className="bg-white shadow-md border-b sticky top-0 z-50">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              QuickTask
            </h1>
            <p className="text-sm text-gray-500">
              Task Management System
            </p>
          </div>

          <div className="flex items-center gap-6">

            <Link
              to="/dashboard"
              className="font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Profile
            </Link>

            {user?.role === "admin" && (
              <>
                <Link
                  to="/admin"
                  className="font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Admin
                </Link>

                <Link
                  to="/admin/users"
                  className="font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Users
                </Link>

                <Link
                  to="/admin/tasks"
                  className="font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Tasks
                </Link>
              </>
            )}

            <div className="flex items-center gap-3">

              <div className="text-right">

                <p className="font-semibold text-slate-700">
                  {user?.name || "User"}
                </p>

                <p className="text-xs text-gray-500 uppercase">
                  {user?.role || "Member"}
                </p>

              </div>

              <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

            </div>

            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-xl bg-red-500 px-5 py-2.5 text-white font-semibold shadow-lg transition hover:bg-red-600 hover:shadow-xl"
            >
              Logout
            </button>

          </div>

        </div>

      </header>

      {/* Main Content */}

      <main className="max-w-7xl mx-auto px-6 py-10">
        {children}
      </main>

    </div>
  );
}

export default MainLayout;