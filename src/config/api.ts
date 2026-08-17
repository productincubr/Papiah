// Single source of truth for the backend base URL. In production this must
// be set via the VITE_API_URL env var (e.g. in Vercel project settings) to
// point at the deployed papiah-backend — it can never be localhost, since
// that resolves to the visitor's own machine, not the server.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
