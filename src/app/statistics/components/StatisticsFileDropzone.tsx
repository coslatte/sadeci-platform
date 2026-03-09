"use client";

import { useRef } from "react";
import { Label } from "@/components/atoms/Label";
import {
  STATS_CLICK_TO_SELECT_FILE,
  STATS_CLICK_TO_SELECT_FILES,
  STATS_EXPERIMENT_LABEL,
} from "@/constants/constants";
import { cn } from "@/lib/utils";

interface StatisticsFileDropzoneProps {
  label: string;
  files: File[];
  inputId: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
}

export function StatisticsFileDropzone({
  label,
  files,
  inputId,
  multiple = false,
  onChange,
}: StatisticsFileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={inputId}>{label}</Label>
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        className={cn(
          "flex flex-col items-center justify-center gap-2",
          "cursor-pointer rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center transition-colors hover:border-primary-400",
          files.length > 0 && "border-primary-300 bg-primary-50",
        )}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept=".csv"
          multiple={multiple}
          className="sr-only"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const selected = event.target.files
              ? Array.from(event.target.files)
              : [];
            onChange(selected);
          }}
        />

        {files.length > 0 ? (
          <ul className="w-full text-left">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="text-(length:--font-size-sm) font-medium text-primary-700"
              >
                {multiple ? `${STATS_EXPERIMENT_LABEL(index + 1)}: ` : ""}
                {file.name}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-(length:--font-size-sm) text-zinc-400">
            {multiple
              ? STATS_CLICK_TO_SELECT_FILES
              : STATS_CLICK_TO_SELECT_FILE}
          </span>
        )}
      </div>
    </div>
  );
}
