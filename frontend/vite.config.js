import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
 server: {
  allowedHosts: ['mern-frontend-latest-6uur.onrender.com']
}
});
