/** @notice library imports */
import { defineConfig } from "tsup";

export default defineConfig({
  dts: true, // generate .d.ts files for TypeScript definitions
  clean: true, // clear the output directory before building
  minify: true, // minify the output for smaller bundle size
  bundle: true, // bundle all dependencies
  sourcemap: true, // generate sourcemaps for debugging
  treeshake: true, // enable tree-shaking for optimized output
  splitting: false, // avoid code splitting for simpler output
  outDir: "dist", // specify the output directory
  target: "es2020", // specify ECMAScript target version
  format: ["cjs", "esm"], // build both CommonJS and ESModule formats
  entry: ["src/index.ts"], // entry point for the project
  external: ["dotenv", "zod"], // mark these as external dependencies
});
