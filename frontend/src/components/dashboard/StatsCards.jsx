function StatsCards({
  totalTasks,
  pendingTasks,
  inProgressTasks,
  completedTasks,
}) {
  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: "📋",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: "⏳",
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: "🚀",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: "✅",
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl bg-gradient-to-r ${card.color} text-white p-6 shadow-xl hover:scale-105 transition-all duration-300`}
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-white/80 text-sm">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {card.value}
              </h2>

            </div>

            <div className="text-5xl">
              {card.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}

export default StatsCards;