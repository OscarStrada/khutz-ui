import { defineConfig } from "vite";
import { peerDependencies } from "./package.json";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            exclude: ["**/*.test.ts"],
        }),
    ],
    build: {
        lib: {
            entry: "./src/index.ts",
            name: "ui",
            fileName: function (format) { return "ui.".concat(format, ".js"); },
            formats: ["es", "cjs", "umd"],
        },
        rollupOptions: {
            external: Object.keys(peerDependencies),
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
});
