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
  create(req, res, next) {
    const salt = bcrypt.genSaltSync(Math.floor(Math.random() * 5));

    const {
      firstName, lastName, email, department, password,
    } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, salt);

    const Query = {
      text: 'INSERT INTO users (firstName, lastName, email,  department, password) VALUES($1, $2, $3, $4, $5)',
      values: [firstName, lastName, email, department, encryptedPassword],
    };

    db.on('error', (err, client) => {
      res.json('Unexpected error on idle client', err);
      process.exit(-1);
    });
    db.connect()
      .then((client) => {
        return client.query(Query)
          .then(() => {
            client.release();
            return next();
          })
          .catch((error) => {
            client.release();
            return res.status(400).json({
              success: 'false',
              message: `could not create for ${firstName} ${lastName} because email already exist`,
            });
          });
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

    db.on('error', (err, client) => {
      res.json('Unexpected error on idle client', err)
      process.exit(-1);
    });

    db.connect()
      .then((client) => {
        return client.query(Query)
          .then((user) => {
            if (!user.rows[0]) {
              client.release();
              res.status(404).json({
                success: 'false',
                message: 'User not found',
              });
            }

            const checkPassword = bcrypt
              .compareSync(password.trim(), user.rows[0].password);
            if (!checkPassword) {
              client.release();
              return res.status(400).json({
                success: 'false',
                message: 'Wrong password',
              });
            }
            const authToken = auth.token(user.rows[0]);
            client.release();
            return res.status(200).json({
              success: 'true',
              message: 'Sign in successful',
              token: authToken,
            });
          })
          .catch((err) => {
            client.release();
            return res.status(500).json({
              success: 'false',
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
    db.on('error', (err, client) => {
      res.json('Unexpected error on idle client', err)
      process.exit(-1);
    });

    db.connect()
      .then((client) => {
        return client.query(Query)
          .then((requests) => {
            if (!requests.rows) {
              client.release();
              return res.status(404).json({
                success: 'false',
                message: 'Request not found',
              });
            }
            client.release();
            return res.status(200).json({
              success: 'true',
              message: 'all requests retrieved successfully',
              requests: requests.rows,
            });
          })
          .catch((error) => {
            client.release();
          return res.status(400).json({
              success: 'false',
              message: 'could not retrieve requests',
            });
          });
      });
  }

  getOneRequest(req, res) {
    const Id = parseInt(req.params.id, 10);
    const { email } = req.body.token;
    const Query = {
      name: 'fetch-user',
      text: 'SELECT * FROM requests WHERE email = $1 AND Id = $2 ',
      values: [email, Id],
    };

    db.on('error', (err, client) => {
      res.json('Unexpected error on idle client', err);
      process.exit(-1);
    });

    db.connect()
      .then((client) => {
        return client.query(Query)
          .then((request) => {
            if (!request.rows[0]) {
              client.release();
            return res.status(404).json({
                success: 'false',
                message: 'Request not found',
              });
            }
            client.release();
            return res.status(200).json({
              success: 'true',
              message: 'Request retrieved successfully',
              request: request.rows[0],
            });
          })
          .catch((error) => {
            client.release();
            return res.status(400).json({
              success: 'false',
              message: 'could not retrieve request'
            });
          });
      });
  }

  createRequest(req, res) {
    const { email } = req.body.token;
    const { option, description } = req.body;
    const Query = {
      text: 'INSERT INTO requests(option, description, email, status) VALUES($1, $2, $3, $4) RETURNING option, description, status',
      values: [option, description, email, 'pending'],
    };

    db.on('error', (err, client) => {
      res.json('Unexpected error on idle client', err)
      process.exit(-1);
    });

    db.connect()
      .then((client) => {
        return client.query(Query)
          .then((user) => {
            client.release();
            res.status(201).json({
              success: 'true',
              message: 'Request created successfully',
              request: user.rows[0],
            });
          })
          .catch((error) => {
            client.release();
           return res.status(400).json({
              success: 'false',
              message: 'Request not created',
              error,
            });
          });
      });
  }

  updateRequest(req, res) {
    const Id = parseInt(req.params.id, 10);
    const { email } = req.body.token;
    const { option, description } = req.body;
    const Query = {
      text: 'UPDATE requests SET option = $1, description = $2 WHERE email = $3 AND Id = $4',
      values: [option, description, email, Id],
    };

    db.on('error', (err, client) => {
      res.json('Unexpected error on idle client', err);
      process.exit(-1);
    });

    db.connect()
      .then((client) => {
        return client.query(Query)
          .then((request) => {
            client.release();
            return res.status(201).json({
              success: 'true',
              message: 'Request updated successfully',
              request: request.rows[0],
            });
          })
          .catch((error) => {
            client.release();
            return res.status(400).json({
              success: 'false',
              message: 'Request not updated',
              error,
            });
          });
      });
  }
}


const user = new User();
export default user;
