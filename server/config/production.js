import dotenv from 'dotenv';

dotenv.config();

const production = {
    database: process.env.DATABASE_URL
}


export default production;