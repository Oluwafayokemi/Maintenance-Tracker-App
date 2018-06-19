/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import auth from '../middleware/auth';
import db from '../models/index';

dotenv.config();

/**
 * @export
 * @class user
 */
class User {
  /**
   * @param {object} request - HTTP User
   * @param {object} response - HTTP Response
   * @returns {object} Class instance
   * @description create User Account.
   */
  create(req, res) {
    const salt = bcrypt.genSaltSync(Math.floor(Math.random() * 5));

    const {
      firstName,
      lastName,
      email,
      department,
      password,
    } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, salt);

    const queryString = {
      text: 'INSERT INTO users (firstName, lastName, email,  department, password) VALUES($1, $2, $3, $4, $5) RETURNING *;',
      values: [firstName, lastName, email, department, encryptedPassword],
    };

    db.connect()
      .then(client => client.query(queryString)
        .then((user) => {
          client.release(user);
          const token = auth.token(user.rows[0]);
          return res.status(200).json({
            status: 200,
            success: 'true',
            message: 'sign up was successful',
            user: {
              firstName: user.rows[0].firstname,
              lastName: user.rows[0].lastname,
              email: user.rows[0].email,
              department: user.rows[0].department,
              isAdmin: user.rows[0].isadmin,
            },
            token,
          });
        })
        .catch((err) => {
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'email already exists',
          });
        }));
  }

  login(req, res) {
    const {
      email,
      password,
    } = req.body;

    const queryString = {
      // give the query a unique name
      name: 'fetch-user',
      text: 'SELECT * FROM users WHERE email = $1 LIMIT 1;',
      values: [email],
    };

    db.connect()
      .then(client => client.query(queryString)
        .then((user) => {
          client.release(user);
          if (!user.rows[0]) {
            return res.status(404).json({
              status: 404,
              success: 'false',
              message: 'User not found',
            });
          }

          const userPassword = bcrypt
            .compareSync(password.trim(), user.rows[0].password);
          if (!userPassword) {
            return res.status(400).json({
              status: 400,
              success: 'false',
              message: 'Wrong password',
            });
          }
          const authToken = auth.token(user.rows[0]);
          return res.status(200).json({
            status: 200,
            success: 'true',
            message: 'Sign in successful',
            user: {
              firstName: user.rows[0].firstname,
              lastName: user.rows[0].lastname,
              email: user.rows[0].email,
              department: user.rows[0].department,
              isAdmin: user.rows[0].isadmin,
            },
            token: authToken,
          });
        })
        .catch((error) => {
          client.release();
          return res.status(403).json({
            status: 403,
            success: 'false',
            message: 'invalid action',
          });
        }));
  }
}

const user = new User();
export default user;
