function DashboardHeader({ user }) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">

      <div className="flex items-center justify-between flex-wrap gap-6">

        <div>

          <p className="text-blue-100 text-lg">
            Welcome Back 👋
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {user?.name}
          </h1>

          <p className="text-blue-100 mt-3">
            Stay productive and manage your daily tasks efficiently.
          </p>

        </div>

        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-5xl shadow-lg">

          🚀

        </div>

      </div>

    </div>
  );
}

export default DashboardHeader;