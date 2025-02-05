import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: "ep-restless-math-a88lcdns-pooler.eastus2.azure.neon.tech",
    port: 5432,
    user: "neondb_owner",
    password: "npg_nNXDl2xgEcH9",
    database: "neondb",
    ssl: "require",
  },
  out: "./drizzle",
});