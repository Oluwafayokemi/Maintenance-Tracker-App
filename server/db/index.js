import pg from 'pg';
import  dotenv from 'dotenv';
import production from '../config/production.config';
import development from './../config/dev.config';
import test from './../config/test.config.js';

dotenv.config();

let config;
const env = process.env.NODE_ENV;
if (env === 'production') {
    config = production
} else if(env === 'test') {
    config =  test
} else {
    config = development
}

const db = new pg.Pool(config);

export default db;