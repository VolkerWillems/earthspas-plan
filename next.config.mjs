import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias["@phosphor-icons/react$"] = path.resolve(__dirname, "lib/phosphor-icons.ts");
    return config;
  },
};

export default nextConfig;
