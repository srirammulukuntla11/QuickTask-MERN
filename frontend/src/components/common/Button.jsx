function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        cursor-pointer
        rounded-xl
        bg-gradient-to-r
        from-blue-600
        to-indigo-600
        px-5
        py-3
        text-white
        font-semibold
        text-base
        shadow-lg
        transition-all
        duration-300
        hover:from-blue-700
        hover:to-indigo-700
        hover:shadow-xl
        hover:-translate-y-0.5
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:hover:translate-y-0
        disabled:hover:shadow-lg
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;