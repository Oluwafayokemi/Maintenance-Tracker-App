import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool({
    connectionString: process.env.DATABASE_URL
});

const creatUserTable = ';DROP TABLE IF EXISTS users CASCADE; CREATE TABLE users(id SERIAL PRIMARY KEY NOT NULL, firstName VARCHAR(100) NOT NULL, lastName VARCHAR(100) NOT NULL, isAdmin BOOLEAN NOT NULL DEFAULT FALSE, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(400) NOT NULL, department VARCHAR(100), joined DATE DEFAULT CURRENT_DATE)'
const createRequestTable = ';DROP TABLE IF EXISTS requests CASCADE; CREATE TABLE requests(id SERIAL PRIMARY KEY NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, option VARCHAR(100) NOT NULL,  description TEXT NOT NULL, status VARCHAR(100) NOT NULL)'
const insertUserTable = ';INSERT INTO users(firstName, lastName, isAdmin, email, password, department) VALUES(\'fayokemi\', \'adeyina\', TRUE, \'fayoaright@gmail.com\', \'fayokemi\', \'Water Management\')'
const insertUser2Table = ';INSERT INTO users(firstName, lastName, email, password, department) VALUES(\'fayokemi\', \'adeyina\', \'omotola@gmail.com\', \'fayokemi\', \'Water Management\')'
const insertRequestTable = ';INSERT INTO requests(option, email, description, status) VALUES( \'fayoaright@gmail.com\', \'generator\', \'air condition blows hot air\', \'pending\')'
const Query = `${creatUserTable} ${createRequestTable} ${insertUserTable} ${insertUser2Table} ${insertRequestTable}`
db.query(Query, (err, res) => {
    console.log(err, res)
    db.end()
});
