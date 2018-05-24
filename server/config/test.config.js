import dotenv from 'dotenv';
dotenv.config();

const test = {
        user: process.env.user,
        host: process.env.host,
        database: process.env.db_test,
        port: process.env.port,
        max: process.env.test,
        idleTimeoutMillis: process.env.idleTimeoutMillis
}
export default test;