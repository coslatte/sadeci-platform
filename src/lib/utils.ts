type ClassValue = string | undefined | null | false | ClassValue[];

export function cn(...classes: ClassValue[]): string {
  return classes.flat(10).filter(Boolean).join(" ");
}

/**
 * Returns a props object that can be spread into a component root to mark it as disabled
 * using a data attribute. Example: <div {...dataDisabledProps(disabled)}>
 */
export function dataDisabledProps(disabled?: boolean) {
  return disabled ? { "data-disabled": "true" } : {};
}
