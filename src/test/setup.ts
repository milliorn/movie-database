import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "./server";

const store: Record<string, string> = {};

const localStorageMock = new Proxy(store, {
  get(target, prop) {
    if (prop === "getItem") return (key: string) => target[key] ?? null;
    if (prop === "setItem")
      return (key: string, value: string) => {
        target[key] = value;
      };
    if (prop === "removeItem")
      return (key: string) => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete target[key];
      };
    if (prop === "clear")
      return () => {
        Object.keys(target).forEach((k) => {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete target[k];
        });
      };
    if (prop === "length") return Object.keys(target).length;
    if (prop === "key")
      return (index: number) => Object.keys(target)[index] ?? null;
    return target[prop as string];
  },
  ownKeys(target) {
    return Object.keys(target);
  },
  getOwnPropertyDescriptor(target, prop) {
    if (Object.prototype.hasOwnProperty.call(target, prop)) {
      return {
        enumerable: true,
        configurable: true,
        value: target[prop as string],
      };
    }
    return undefined;
  },
});

vi.stubGlobal("localStorage", localStorageMock);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
afterEach(() => {
  server.resetHandlers();
  (localStorage.clear as () => void)();
  vi.clearAllMocks();
});
afterAll(() => {
  server.close();
});
