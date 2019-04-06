/**
 * @file seed users table
 */

// Modules
import bcrypt from 'bcryptjs';

// Const
const password = 'tester';
const salt = bcrypt.genSaltSync(Math.floor(Math.random() * 5));
const encryptedPassword = bcrypt.hashSync(password, salt);

/**
 * @constant insertUserTable
 * @constant inserUserKayTable
 * @constant insertUser2Table
 * @description seed data into users table
 */
export const insertUserTable = `;INSERT INTO 
    users( firstName, lastName, isAdmin, email, password, department ) 
    VALUES('fayokemi', 'adeyina', TRUE, 'fayoaright@gmail.com', '${encryptedPassword}', 'Water Management')`;
export const insertUserKayTable = `;INSERT INTO 
    users(firstName, lastName, isAdmin, email, password, department) 
    VALUES('kayode', 'adeyina', TRUE, 'kayode@gmail.com', '${encryptedPassword}', 'Water Management')`;
export const insertUser2Table = `;INSERT INTO 
    users(firstName, lastName, email, password, department) 
    VALUES('omotola', 'adeyina', 'omotola@gmail.com', '${encryptedPassword}', 'Water Management')`;
