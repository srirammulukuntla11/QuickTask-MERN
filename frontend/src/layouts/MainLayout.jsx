import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function MainLayout({ children }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-blue-600 text-white shadow-md">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          <h1 className="text-2xl font-bold">
            QuickTask
          </h1>

          <div className="flex gap-6 items-center">

            <Link
              to="/dashboard"
              className="hover:text-gray-200"
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="hover:text-gray-200"
            >
              Profile
            </Link>

            {user?.role === "admin" && (
              <>
                <Link
                  to="/admin"
                  className="hover:text-gray-200"
                >
                  Admin
                </Link>

                <Link
                  to="/admin/users"
                  className="hover:text-gray-200"
                >
                  Users
                </Link>

                <Link
                  to="/admin/tasks"
                  className="hover:text-gray-200"
                >
                  Tasks
                </Link>
              </>
            )}

            <button
              onClick={() => {
  logout();
  navigate("/");
}}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>

      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>

    </div>
  );
}

export default MainLayout;