import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/client.ts"],
  format: ["esm", "cjs"],
  dts: true, // Generates the .d.ts files
  clean: true,
});
