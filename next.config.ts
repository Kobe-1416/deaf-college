import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '192.168.*.*',    // Common home/office networks
    '10.*.*.*',       // Private networks
    '172.16.*.*',     // Private networks
  ],
};

export default nextConfig;
