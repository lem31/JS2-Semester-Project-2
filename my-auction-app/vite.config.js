import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    eslintPlugin({
      include: ["src/**/*.{js}, src/js/**/*.{js}"],
      lintOnSave: true,
    }),
  ],
});
