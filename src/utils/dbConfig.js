import {neon} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'
import * as schema  from "./schema.js"

const sql = neon(
    "postgresql://neondb_owner:npg_1pTUmwsh9trM@ep-wispy-grass-a55iz3p8-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
);  // ✅ Use Vite's env system

export const db = drizzle(sql,{schema});