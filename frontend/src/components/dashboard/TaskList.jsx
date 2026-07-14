import TaskCard from "./TaskCard";

function TaskList({
  loading,
  filteredTasks,
  startEdit,
  deleteTask,
  updateStatus,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>

        <p className="mt-6 text-gray-500">
          Loading Tasks...
        </p>

      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

        <div className="text-7xl mb-4">
          📂
        </div>

        <h2 className="text-2xl font-bold text-slate-700">
          No Tasks Found
        </h2>

        <p className="text-gray-500 mt-2">
          Create a new task or change your filters.
        </p>

      </div>
    );
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold text-slate-800">
          My Tasks
        </h2>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
          {filteredTasks.length} Tasks
        </span>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            startEdit={startEdit}
            deleteTask={deleteTask}
            updateStatus={updateStatus}
          />
        ))}

      </div>

    </div>
  );
}

export default TaskList;