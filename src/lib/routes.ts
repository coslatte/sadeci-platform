export const routes = {
  home: "/",
  reportes: "/reportes",
  usuarios: "/usuarios",
  ajustes: "/ajustes",
} as const;

export type Route = (typeof routes)[keyof typeof routes];
