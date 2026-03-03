import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { cleanup } from "@testing-library/react";
import { afterEach } from "bun:test";

GlobalRegistrator.register();

// Provide a default mock for `next/navigation` so components using the App
// Router (useRouter, usePathname, useSearchParams) do not throw during tests.
// Individual tests may override this mock if they need custom behavior.
try {
  // bun:test exposes `mock` globally in test files; here we use require to
  // access it at runtime when tests run under Bun.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const bt = require("bun:test");
  if (bt && typeof bt.mock === "function") {
    bt.mock.module("next/navigation", () => ({
      usePathname: () => "/",
      useRouter: () => ({ back: () => {}, push: () => {}, replace: () => {} }),
      useSearchParams: () => new URLSearchParams(),
    }));
  }
} catch (err) {
  // ignore when not running under Bun test environment
}

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});
