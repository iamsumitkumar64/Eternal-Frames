import { Client } from 'pg';

export async function createSchemas() {
    try {
        const client = new Client({
            host: process.env.DB_POSTGRES_HOST,
            port: Number(process.env.DB_POSTGRES_PORT),
            user: process.env.DB_POSTGRES_USERNAME,
            password: process.env.DB_POSTGRES_PASSWORD,
            database: process.env.DB_POSTGRES_DATABASE,
        });

        await client.connect();

        await client.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.DB_POSTGRES_USER_SCHEMA || 'user_schema'};`);
        await client.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.DB_POSTGRES_BILLING_SCHEMA || 'billing_schema'};`);
        await client.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema'};`);

        console.log('DB CREATE SCHEMA IF NOT EXISTS SUCCESS');
        await client.end();
    }
    catch (err: any) {
        console.log(`DB CREATE SCHEMA ERROR : ${err}`);
    }
}