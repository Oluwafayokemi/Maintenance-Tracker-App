import dotenv from 'dotenv';

dotenv.config();

// const production = {
//     user: process.env.user,
//     host: process.env.host,
//     database: process.env.DATABASE_URL,
//     port: process.env.port,
//     max: process.env.test,
//     idleTimeoutMillis: process.env.idleTimeoutMillis
// }

const production = {
    database: process.env.DATABASE_URL
}


export default production;