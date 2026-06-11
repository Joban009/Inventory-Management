// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],

//   server: {
//     proxy: {
//       "/backend": {
//         target: "http://localhost/Inventory_Management/InventoryMGT",
//         changeOrigin: true,
//       },
//     },
//   },
// });

// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  // Dev proxy — keeps local development working
  server: {
    proxy: {
      "/backend": {
        target: "http://localhost", // your local XAMPP
        changeOrigin: true,
      },
    },
  },
});
