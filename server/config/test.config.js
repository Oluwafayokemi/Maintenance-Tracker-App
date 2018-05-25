import dotenv from 'dotenv';
dotenv.config();

const test = {
        user: 'postgres',
        host: 'localhost',
        database: process.env.db_test,
        port: 5432,
        max: 10,
        idleTimeoutMillis:30000
}
export default test;