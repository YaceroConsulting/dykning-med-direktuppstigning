import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/dykning-med-direktuppstigning/",
  plugins: [
    remix({
      basename: "/dykning-med-direktuppstigning/",
      ssr: false,
    }),
    tsconfigPaths(),
  ],
});
