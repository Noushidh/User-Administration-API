import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

export async function connectPostgres() {
    try {
        await pool.query("SELECT NOW()");
        console.log("PostgreSQL Connected");
    } catch (error) {
        console.error("PostgreSQL Connection Failed", error);
        process.exit(1);
    }
}