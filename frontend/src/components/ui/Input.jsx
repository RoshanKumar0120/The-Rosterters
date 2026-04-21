import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
  onKeyDown = () => {},
  disabled = false,
  error = "",
  startAdornment,
  endAdornment,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const displayType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative">
      <input
        type={displayType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600
          bg-white dark:bg-slate-700 text-slate-900 dark:text-white
          placeholder-slate-500 dark:placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-slate-300
          disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400
          ${error ? "border-red-500 dark:border-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      {startAdornment && <div className="absolute left-3 top-1/2 -translate-y-1/2">{startAdornment}</div>}
      {endAdornment || (isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      ))}
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

export { Input };
