function Card({ children, className = "" }) {
  return (
    <div
      className={`
        w-full
        rounded-2xl
        border
        border-gray-200
        bg-white/90
        backdrop-blur-md
        p-8
        shadow-xl
        transition-all
        duration-300
        hover:shadow-2xl
        hover:-translate-y-1
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;