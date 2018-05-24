import dotenv from 'dotenv';

dotenv.config();

const development = {
        user: process.env.user,
        host: process.env.host,
        database: process.env.db_development,
        port: process.env.port,
        max: process.env.test,
        idleTimeoutMillis: process.env.idleTimeoutMillis
}

export default development;