import { cn, dataDisabledProps } from "@/lib/utils";
import React, { useId, useRef } from "react";
import { FiChevronUp, FiChevronDown, FiInfo } from "react-icons/fi";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
  help?: string;
  info?: string;
  showNumberControls?: boolean;
}

export function Input({
  error,
  fullWidth = true,
  className,
  disabled,
  help,
  info,
  showNumberControls = true,
  type,
  ...props
}: InputProps) {
  const inputId = useId();
  const infoId = info ? `${inputId}-info` : undefined;
  const ref = useRef<HTMLInputElement | null>(null);

  const inputType = type ?? "text";
  const hasNumberControls =
    inputType === "number" && showNumberControls && !disabled;

  // Support both React's onChange and native input events that tests may dispatch.
  const { onChange, id, ...restProps } = props;

  return (
    <div className={cn("relative flex items-center", fullWidth && "w-full")}>
      <input
        {...dataDisabledProps(disabled)}
        ref={ref}
        id={id}
        aria-describedby={infoId}
        type={type}
        className={cn(
          "h-9 rounded-lg border bg-white px-3 text-(length:--font-size-sm) text-zinc-900 shadow-xs placeholder:text-zinc-400 transition-colors duration-150 input-transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
          hasNumberControls || info ? "pr-12" : "pr-3",
          error
            ? "border-red-400 focus:ring-red-500 focus:border-red-500"
            : "border-zinc-300",
          fullWidth && "w-full",
          className,
        )}
        disabled={disabled}
        // forward React onChange
        onChange={onChange}
        // also forward native input events to the React onChange handler so tests
        // that dispatch native `input` events update controlled components
        onInput={(e) => {
          if (onChange)
            onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
        }}
        {...restProps}
      />

      {hasNumberControls && (
        <div
          className="absolute right-2 flex flex-col h-[calc(100%-0.75rem)] justify-center"
          aria-hidden
        >
          <button
            type="button"
            aria-label="Incrementar valor"
            className="flex items-center justify-center w-8 h-1/2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-t-lg input-transition"
            onClick={() => ref.current?.stepUp()}
          >
            <FiChevronUp className="h-4 w-4" aria-hidden />
          </button>
          <div className="h-px w-6 bg-gray-100 mx-auto" />
          <button
            type="button"
            aria-label="Disminuir valor"
            className="flex items-center justify-center w-8 h-1/2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-b-lg input-transition"
            onClick={() => ref.current?.stepDown()}
          >
            <FiChevronDown className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}

      {info && (
        <div
          className="absolute right-2 flex items-center"
          style={{ right: hasNumberControls ? 38 : 8 }}
        >
          <div className="group relative flex items-center">
            <button
              type="button"
              aria-label="Más información"
              aria-describedby={infoId}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-primary-50 input-transition"
            >
              <FiInfo className="w-4 h-4" aria-hidden />
            </button>

            {infoId && (
              <div
                id={infoId}
                role="tooltip"
                className="absolute bottom-full right-1/2 mb-2 translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-1 text-(length:--font-size-xs) text-white opacity-0 transition-opacity pointer-events-none group-hover:opacity-100 group-focus:opacity-100"
              >
                {info}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
              </div>
            )}
          </div>
        </div>
      )}

      {help && (
        <div className="group/help absolute -top-2.5 -right-2.5 z-10">
          <button
            type="button"
            aria-label="Información de ayuda del campo"
            className="w-5 h-5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-500 text-[10px] font-bold flex items-center justify-center cursor-help hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-colors"
          >
            ?
          </button>
          <div
            role="tooltip"
            className="absolute bottom-full right-0 mb-2 w-60 max-w-xs rounded-lg bg-gray-800 px-3 py-2 text-(length:--font-size-xs) text-white opacity-0 transition-opacity pointer-events-none group-hover/help:opacity-100 group-focus-within/help:opacity-100 whitespace-normal"
          >
            {help}
            <div className="absolute top-full right-3 border-4 border-transparent border-t-gray-800" />
          </div>
        </div>
      )}
    </div>
  );
}
