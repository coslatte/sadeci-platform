import { cn } from "@/lib/utils";
import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, "id">;
}

export function FormField({
  id,
  label,
  required,
  error,
  hint,
  className,
  inputProps,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Input
        id={id}
        error={!!error}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        aria-invalid={!!error}
        {...inputProps}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-zinc-500 dark:text-zinc-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
