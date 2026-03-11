import {
  FiActivity,
  FiBarChart2,
  FiHome,
  FiSettings,
  FiUsers,
  FiLayout,
  FiCpu,
} from "react-icons/fi";

export type NavigationIconKey =
  | "home"
  | "activity"
  | "barchart"
  | "users"
  | "settings"
  | "admin"
  | "prediction";

export const NAVIGATION_ICON_REGISTRY = {
  home: FiHome,
  activity: FiActivity,
  barchart: FiBarChart2,
  users: FiUsers,
  settings: FiSettings,
  admin: FiLayout,
  prediction: FiCpu,
} as const;
