/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pins the project root to this folder. Without it Next.js walks up the
  // directory tree looking for a lockfile and can pick the wrong one.
  turbopack: {
    root: import.meta.dirname,
  },

  // Next.js auto-generates AGENTS.md / CLAUDE.md files for AI tools.
  // Turned off to keep the project folder clean.
  agentRules: false,
};

export default nextConfig;
