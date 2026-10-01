/**
 * Central API configuration for Kinetic Technology.
 * In production on Vercel (or via Vite proxy in development), relative /api is used.
 * You can also override with VITE_API_BASE_URL in .env if needed.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
