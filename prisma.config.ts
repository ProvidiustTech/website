// prisma.config.ts  (must be in the root of your project)
import "dotenv/config";   // ← This line is the most important fix

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url: env("DATABASE_URL"),
  },
});