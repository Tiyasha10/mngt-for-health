import {neon} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'
import * as schema  from "./schema.js"

const sql = neon(
    "postgresql://neondb_owner:npg_7f9bCEkpnPzh@ep-falling-frost-a51ica3t-pooler.us-east-2.aws.neon.tech/db1?sslmode=require",
);  // ✅ Use Vite's env system

export const db = drizzle(sql,{schema});