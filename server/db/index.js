import pg from 'pg';
import  dotenv from 'dotenv';

dotenv.config();

const config = {
        user: 'postgres',
        password: '',
        host: 'localhost',
        port: 5432,
        max: 10,
        idleTimeoutMillis: 30000
}
const env = process.env.NODE_ENV || 'development';
if (env === 'test') {
    config.database = process.env.test

} else {
    config.database =  process.env.development
}

const db = new pg.Pool(config);

export default db;