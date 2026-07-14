function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      className={`
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-3
        text-gray-800
        text-base
        placeholder:text-gray-400
        shadow-sm
        transition-all
        duration-300
        outline-none
        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-100
        hover:border-blue-400
        hover:shadow-md
        ${className}
      `}
    />
  );
}

export default Input;