import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const password = 'tester';
const salt = bcrypt.genSaltSync(Math.floor(Math.random() * 5));
const encryptedPassword = bcrypt.hashSync(password, salt);

const creatUserTable = ';DROP TABLE IF EXISTS users CASCADE; CREATE TABLE users(userId SERIAL PRIMARY KEY NOT NULL, firstName VARCHAR(100) NOT NULL, lastName VARCHAR(100) NOT NULL, isAdmin BOOLEAN NOT NULL DEFAULT FALSE, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(400) NOT NULL, department VARCHAR(100), joined DATE DEFAULT CURRENT_DATE)';
const createRequestTable = ';DROP TABLE IF EXISTS requests CASCADE; CREATE TABLE requests(requestId SERIAL PRIMARY KEY NOT NULL, userId SERIAL NOT NULL, equipment VARCHAR(100) NOT NULL,  description TEXT NOT NULL, status VARCHAR(100))';
const insertUserTable = `;INSERT INTO users(firstName, lastName, isAdmin, email, password, department) VALUES('fayokemi', 'adeyina', TRUE, 'fayoaright@gmail.com', '${encryptedPassword}', 'Water Management')`;
const insertUser2Table = `;INSERT INTO users(firstName, lastName, email, password, department) VALUES('fayokemi', 'adeyina', 'omotola@gmail.com', '${encryptedPassword}', 'Water Management')`;
const insertRequestTable = ';INSERT INTO requests(userId, equipment, description, status) VALUES(1, \'generator\', \'Generator goes off always\', \'pending\')';
const insertRequest2Table = ';INSERT INTO requests(userId, equipment, description, status) VALUES(2, \'Air Condition\', \'air condition blows hot air\', \'resolved\')';
const Query = `${creatUserTable} ${createRequestTable} ${insertUserTable} ${insertUser2Table} ${insertRequestTable} ${insertRequest2Table}`;
db.query(Query, (err, res) => {
  console.log(err, res);
  db.end();
});
