import Card from "../common/Card";
import Button from "../common/Button";

function TaskCard({
  task,
  startEdit,
  deleteTask,
  updateStatus,
}) {
  const priorityColor = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  const statusColor = {
    Pending: "bg-gray-100 text-gray-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <Card className="hover:shadow-2xl transition-all duration-300">

      <div className="flex justify-between items-start mb-4">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            {task.title}
          </h2>

          <p className="text-gray-500 mt-2">
            {task.description}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>

      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-5">

        <div>

          <p className="text-sm text-gray-500">
            Status
          </p>

          <span
            className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${statusColor[task.status]}`}
          >
            {task.status}
          </span>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Due Date
          </p>

          <p className="font-medium text-slate-700 mt-1">
            {task.dueDate
              ? new Date(
                  task.dueDate
                ).toLocaleDateString()
              : "Not Set"}
          </p>

        </div>

      </div>

      <select
        value={task.status}
        onChange={(e) =>
          updateStatus(
            task._id,
            e.target.value
          )
        }
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          mb-5
          focus:ring-4
          focus:ring-blue-100
          focus:border-blue-500
          outline-none
        "
      >
        <option value="Pending">
          Pending
        </option>

        <option value="In Progress">
          In Progress
        </option>

        <option value="Completed">
          Completed
        </option>

      </select>

      <div className="grid grid-cols-2 gap-4">

        <Button
          type="button"
          onClick={() => startEdit(task)}
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          ✏️ Edit
        </Button>

        <Button
          type="button"
          onClick={() =>
            deleteTask(task._id)
          }
          className="bg-red-500 hover:bg-red-600"
        >
          🗑 Delete
        </Button>

      </div>

    </Card>
  );
}

export default TaskCard;