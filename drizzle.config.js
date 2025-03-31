export default {
    dialect: "postgresql",
    schema: "./src/utils/schema.js",
    out: "./drizzle",
    dbCredentials: {
      url: "postgresql://neondb_owner:npg_1pTUmwsh9trM@ep-wispy-grass-a55iz3p8-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
      connectionString: "postgresql://neondb_owner:npg_1pTUmwsh9trM@ep-wispy-grass-a55iz3p8-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
    },
  };