import {neon} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'
import * as schema  from './schema'

const sql = neon(
    "postgresql://neondb_owner:npg_C8rMoWxF3YyK@ep-plain-bread-a8up7ldh-pooler.eastus2.azure.neon.tech/db1?sslmode=require",
);  // ✅ Use Vite's env system

export const db = drizzle(sql,{schema});