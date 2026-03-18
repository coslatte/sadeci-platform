import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import type { MouseEvent } from "react";
import {
  SIDEBAR_SECTION_COLLAPSE,
  SIDEBAR_SECTION_EXPAND,
} from "@/constants/constants";
import { Button } from "@/components/atoms";

interface SidebarTreeToggleButtonProps {
  expanded: boolean;
  label: string;
  onToggle: () => void;
}

/**
 * Collapse/expand control for sidebar tree items with nested children.
 *
 * @param expanded - Current expanded state of the nested tree item.
 * @param label - Visible label of the parent item used for accessible text.
 * @param onToggle - Callback fired when the user toggles expanded state.
 * Used in X case: expanding child links inside sidebar tree navigation.
 *
 * @example
 * <SidebarTreeToggleButton
 *   expanded={false}
 *   label="Simulación"
 *   onToggle={() => setExpanded((v) => !v)}
 * />
 */
export function SidebarTreeToggleButton({
  expanded,
  label,
  onToggle,
}: SidebarTreeToggleButtonProps) {
  const actionLabel = expanded
    ? SIDEBAR_SECTION_COLLAPSE(label)
    : SIDEBAR_SECTION_EXPAND(label);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    onToggle();
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      aria-expanded={expanded}
      aria-label={actionLabel}
      title={actionLabel}
      variant="secondary"
      className="inline-flex items-center justify-center w-8 h-8 p-0 border rounded-lg shadow-sm border-slate-200 bg-white/95 text-slate-700 hover:bg-white"
    >
      {expanded ? (
        <FiChevronUp className="size-4 shrink-0" aria-hidden="true" />
      ) : (
        <FiChevronDown className="size-4 shrink-0" aria-hidden="true" />
      )}
    </Button>
  );
}
