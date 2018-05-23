import pg from 'pg';
import  dotenv from 'dotenv';
import development from './../config/dev.config';
import test from './../config/test.config.js';

let config;
const env = process.env.NODE_ENV;
if (env === 'development') {
    config = development
} else {
    config = test
}

export default db;

