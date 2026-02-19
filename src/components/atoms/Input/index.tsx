import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

export function Input({
  error,
  fullWidth = false,
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        "h-9 rounded-lg border bg-white px-3 text-sm text-zinc-900 shadow-xs",
        "placeholder:text-zinc-400",
        "transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error
          ? "border-red-400 focus:ring-red-500 focus:border-red-500"
          : "border-zinc-300",
        "dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 dark:placeholder:text-zinc-500",
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
}
