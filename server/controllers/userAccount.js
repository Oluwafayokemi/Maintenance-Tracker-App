/* eslint-disable class-methods-use-this */
import db from '../db/index';
import bcrypt from 'bcryptjs';
import jwtDecode from 'jwt-decode';
import dotenv from 'dotenv';
import auth from '../middleware/auth.js'
dotenv.config()

/**
 * @export
 * @class user
 */

class User {
    /**
       * Get Multiple user record
       *
       * @param {object} req - HTTP User
       * @param {object} res - HTTP Response
       * @returns {object} Class instance
       * @memberof Users
       */
    /* create users */
    create(req, res) {
        const salt = bcrypt.genSaltSync(Math.floor(Math.random() * 5));

        const { firstName, lastName, email, role, department, password } = req.body;
        const encryptedPassword = bcrypt.hashSync(password, salt);

        const Query = {
            text: 'INSERT INTO users (firstName, lastName, email, role, department, password) VALUES($1, $2, $3, $4, $5, $6)',
            values: [firstName, lastName, email, role, department, encryptedPassword],
        }

        db.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        })
        db.connect()
            .then(client => {
                client.query(Query)
                    .then(user => res.status(200).json({
                        success: 'true',
                        message: `Account Created for ${firstName} ${lastName}`
                    }))
                    .catch(error => res.status(400).json({
                        success: 'false',
                        message: `could not create for ${firstName} ${lastName} because email already exist`,
                    }))
            });
    }


    login(req, res) {
        const { email, password } = req.body;
        const Query = {
            // give the query a unique name
            name: 'fetch-user',
            text: 'SELECT * FROM users WHERE email = $1',
            values: [email]
        }
        const emailAddress = email.trim().toLowerCase();

        db.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        })
        db.connect()
        .then((client) => {
            client.query(Query)
              .then((user) => {
                if (!user.rows[0]) {
                  return res.status(404).json({
                    status: 'fail',
                    message: 'User not found',
                  });
                }
    
                const checkPassword = bcrypt
                  .compareSync(password.trim(), user.rows[0].password);
                if (!checkPassword) {
                  return res.status(400).json({
                    status: 'fail',
                    message: 'Wrong password',
                  });
                }
    
                const authToken = auth.token(user.rows[0]);
                return res.status(200).json({
                  status: 'success',
                  message: 'Sign in successfully',
                  data: {
                    token: authToken,
                  },
                });
              })
              .catch((err) => {
                client.release();
                return res.status(500).json({
                  status: 'error',
                  message: 'oops!something went wrong!'
                });
              });
          });

    }
}
const user = new User();
export default user;