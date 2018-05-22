import pg from 'pg';

const config = {
  user: 'postgres',
  database: 'maintenance-tracker',
  password: '',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
}

const db = new pg.Pool(config);

const creatUserTable = ';DROP TABLE IF EXISTS users CASCADE; CREATE TABLE users(id SERIAL PRIMARY KEY NOT NULL, firstName VARCHAR(100) NOT NULL, lastName VARCHAR(100) NOT NULL, role VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, department VARCHAR(100), joined TIMESTAMP)'
const createLoginTable = ';DROP TABLE IF EXISTS login CASCADE; CREATE TABLE login(id SERIAL PRIMARY KEY NOT NULL, email TEXT NOT NULL, hash VARCHAR(100) NOT NULL)'
const createRequestTable = ';DROP TABLE IF EXISTS requests CASCADE; CREATE TABLE requests(id SERIAL PRIMARY KEY NOT NULL, option VARCHAR(100) NOT NULL,  description TEXT NOT NULL, status VARCHAR(100) NOT NULL)'
const insertUserTable = ';INSERT INTO users(firstName, lastName, role, email, department, joined) VALUES(\'fayokemi\', \'adeyina\', \'admin\', \'fayoaright@gmail.com\', \'Water Management\', DEFAULT)'
const insertLoginTable = ';INSERT INTO login(email, hash) VALUES(\'fayoaright@gmail.com\', \'Excellence\')'
const insertRequestTable = ';INSERT INTO requests(option, description, status) VALUES(\'generator\', \'air condition blows hot air\', \'pending\')'
const Query = `${creatUserTable} ${createLoginTable} ${createRequestTable} ${insertUserTable} ${insertLoginTable} ${insertRequestTable}`
db.query(Query, (err, res) => {
console.log(err, res)
db.end()
});

export default db;