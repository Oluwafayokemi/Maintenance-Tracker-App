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

    const {
      firstName, lastName, email, department, password,
    } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, salt);

    const Query = {
      text: 'INSERT INTO users (firstName, lastName, email,  department, password) VALUES($1, $2, $3, $4, $5)',
      values: [firstName, lastName, email, department, encryptedPassword],
    };

    db.connect()
      .then((client) => {
        client.query(Query)
          .then(user => res.status(200).json({
            success: 'true',
            message: `Account Created for ${firstName} ${lastName}`,
            user,
          }))
          .catch(error => res.status(400).json({
            success: 'false',
            message: `could not create for ${firstName} ${lastName} because email already exist`,
          }));
      });
  }


  login(req, res) {
    const { email, password } = req.body;
    const Query = {
      // give the query a unique name
      name: 'fetch-user',
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };
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
              message: 'Sign in successful',
              token: authToken,
            });
          })
          .catch((err) => {
            client.release();
            return res.status(500).json({
              status: 'error',
              message: 'oops!something went wrong!',
              err,
            });
          });
      });
  }

  getAllRequest(req, res) {
    const Query = {
      name: 'fetch-user',
      text: 'SELECT * FROM requests WHERE email = $1',
      values: [req.body.token.email],
    };
    db.connect()
      .then((client) => {
        client.query(Query)
          .then(requests => res.status(200).json({
            success: 'true',
            message: 'all requests retrieved successfully',
            requests: requests.rows,
          }))
          .catch(error => res.status(400).json({
            success: 'false',
            message: 'could not retrieve requests',
            error,
          }));
      });
  }

  getOneRequest(req, res) {
    const requestId = parseInt(req.params.id, 10);

    const Query = {
      name: 'fetch-user',
      text: 'SELECT * FROM requests WHERE email = $1 AND Id = $2 ',
      values: [req.body.token.email, requestId],
    };
    db.connect()
      .then((client) => {
        client.query(Query)
          .then(requests => res.status(200).json({
            success: 'true',
            message: 'Request retrieved successfully',
            request: requests.rows,
          }))
          .catch(error => res.status(400).json({
            success: 'false',
            message: 'could not retrieve request',
          }));
      });
  }

  createRequest(req, res) {
    const { option, description } = req.body;

    const Query = {
      text: 'INSERT INTO requests(option, description) VALUES($1, $2) RETURNING option, description',
      values: [option, description],
    };

    db.connect()
      .then((client) => {
        client.query(Query)
          .then(user => res.status(201).json({
            success: 'true',
            message: 'Request created successfully',
            request: user.rows[0],
          }))
          .catch((error) => {
            res.status(400).json({
              success: 'false',
              message: 'Request not created',
              error,
            });
          });
      });
  }
}

const user = new User();
export default user;
