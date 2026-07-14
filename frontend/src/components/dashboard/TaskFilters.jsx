import Input from "../common/Input";

function TaskFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        🔍 Search & Filters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <Input
          placeholder="Search task..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            focus:ring-4
            focus:ring-blue-100
            focus:border-blue-500
            outline-none
          "
        >
          <option value="All">
            All Status
          </option>

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

        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            focus:ring-4
            focus:ring-blue-100
            focus:border-blue-500
            outline-none
          "
        >
          <option value="All">
            All Priorities
          </option>

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

      </div>

    </div>
  );
}

export default TaskFilters;