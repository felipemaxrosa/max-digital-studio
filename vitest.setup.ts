import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// globals:false → registramos o cleanup do RTL manualmente.
afterEach(() => cleanup());
