export default {
    dialect: "postgresql",
    schema: "./src/utils/schema.js",
    out: "./drizzle",
    dbCredentials: {
      url: import.meta.env.VITE_NEON_DATABASE_URL,
      connectionString: import.meta.env.VITE_NEON_DATABASE_URL,
    },
  };