import dotenv from 'dotenv';

dotenv.config();

const development = {
        user: 'postgres',
        host: 'localhost',
        database: process.env.db_development,
        port: 5432,
        max: 10,
        idleTimeoutMillis: 30000
}

export default development;