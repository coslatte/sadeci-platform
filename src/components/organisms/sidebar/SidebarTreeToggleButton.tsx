import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  SIDEBAR_SECTION_COLLAPSE,
  SIDEBAR_SECTION_EXPAND,
} from "@/constants/constants";

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

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={actionLabel}
      title={actionLabel}
      className="absolute inline-flex items-center justify-center overflow-hidden -translate-y-1/2 rounded-lg right-3 top-1/2 size-10 glass-noise-primary text-primary-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      {expanded ? (
        <FiChevronUp className="size-4" aria-hidden="true" />
      ) : (
        <FiChevronDown className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
