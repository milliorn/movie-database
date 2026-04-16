import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    env: {
      VITE_BACKEND_API_URL: "http://localhost:3001",
    },
    coverage: {
      provider: "v8",
      exclude: [
        "src/test/**",
        "src/main.tsx",
        "src/react-app-env.d.ts",
        "**/*.styles.ts",
        "**/styles.ts",
        "**/props.ts",
        "src/Global.props.ts",
        "src/Global.styles.ts",
        "src/config.ts",
        "src/components/pageStyles.ts",
      ],
    },
  },
});
