/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Admins can add products with images hosted anywhere (their own
    // storage, a CDN, etc.) through the admin portal, not just Unsplash —
    // so this allows any HTTPS host rather than an allowlist that would
    // silently break next/image the moment someone pastes in a new URL.
    // For a production deployment where you know your image hosts ahead
    // of time, prefer replacing this with an explicit remotePatterns list
    // (e.g. your CDN's hostname) for tighter security.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

module.exports = nextConfig;
