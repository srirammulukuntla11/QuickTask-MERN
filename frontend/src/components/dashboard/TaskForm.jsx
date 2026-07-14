import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";

function TaskForm({
  editingTask,
  formData,
  handleChange,
  submitHandler,
  resetForm,
}) {
  return (
    <Card>

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-800">

          {editingTask ? "✏️ Edit Task" : "➕ Create New Task"}

        </h2>

        <p className="text-gray-500 mt-2">
          Fill in the details below to manage your tasks efficiently.
        </p>

      </div>

      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >

        <Input
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
        />

        <Input
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            outline-none
          "
        >
          <option value="Low">
            🟢 Low
          </option>

          <option value="Medium">
            🟡 Medium
          </option>

          <option value="High">
            🔴 High
          </option>

        </select>

        <Input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <div className="flex gap-4">

          <Button
            type="submit"
            className="flex-1"
          >
            {editingTask
              ? "Update Task"
              : "Create Task"}
          </Button>

          {editingTask && (
            <Button
              type="button"
              onClick={resetForm}
              className="flex-1 bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
          )}

        </div>

      </form>

    </Card>
  );
}

export default TaskForm;