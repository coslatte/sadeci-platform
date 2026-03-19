import {
  FiActivity,
  FiBarChart2,
  FiHome,
  FiSettings,
  FiUsers,
  FiLayout,
} from "react-icons/fi";
import { RiBrain2Line } from "react-icons/ri";

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
  prediction: RiBrain2Line,
} as const;
