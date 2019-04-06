/**
 * @file create user table
 */

/**
 * @constant createUserTable
 * @description create a table model for users
 */
const creatUserTable =
  ';DROP TABLE IF EXISTS users CASCADE; CREATE TABLE users(userId SERIAL PRIMARY KEY NOT NULL, firstName VARCHAR(100) NOT NULL, lastName VARCHAR(100) NOT NULL, isAdmin BOOLEAN NOT NULL DEFAULT FALSE, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(400) NOT NULL, department VARCHAR(100), joined TIMESTAMP DEFAULT NOW())';

export default creatUserTable;
