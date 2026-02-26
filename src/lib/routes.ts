export const routes = {
  home: "/",
  usuarios: "/usuarios",
  ajustes: "/ajustes",
} as const;

export type Route = (typeof routes)[keyof typeof routes];
