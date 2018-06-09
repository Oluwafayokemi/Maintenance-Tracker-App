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
      text: 'INSERT INTO users (firstName, lastName, email,  department, password) VALUES($1, $2, $3, $4, $5) RETURNING firstName, lastName, isAdmin, email, department',
      values: [firstName, lastName, email, department, encryptedPassword],
    };

    db.connect()
      .then(client => client.query(Query)
        .then(() => {
          client.release();
          return next();
        })
        .catch((err) => {
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'email already exists',
            err,
          });
        }));
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
      .then(client => client.query(Query)
        .then((user) => {
          if (!user.rows[0]) {
            client.release();
            return res.status(404).json({
              status: 404,
              success: 'false',
              message: 'User not found',
            });
          }

          const userPassword = bcrypt
            .compareSync(password.trim(), user.rows[0].password);
          if (!userPassword) {
            client.release();
            return res.status(400).json({
              status: 400,
              success: 'false',
              message: 'Wrong password',
            });
          }
          const authToken = auth.token(user.rows[0]);
          client.release();
          return res.status(200).json({
            status: 200,
            success: 'true',
            message: 'Sign in successful',
            token: authToken,
            user: {
              firstName: user.rows[0].firstname,
              lastName: user.rows[0].lastname,
              email: user.rows[0].email,
              department: user.rows[0].department,
              isAdmin: user.rows[0].isadmin,
            },
          });
        })
        .catch((error) => {
          client.release();
          return res.status(403).json({
            status: 403,
            success: 'false',
            message: 'invalid action',
            error,
          });
        }));
  }

  getAllRequest(req, res) {
    const Query = {
      name: 'fetch-user',
      text: 'SELECT * FROM requests WHERE userid = $1',
      values: [req.body.token.userid],
    };

    db.connect()
      .then(client => client.query(Query)
        .then((requests) => {
          if (!requests.rows) {
            client.release();
            return res.status(404).json({
              status: 404,
              success: 'false',
              message: 'Request not found',
            });
          }
          client.release();
          return res.status(200).json({
            status: 200,
            success: 'true',
            message: 'all requests retrieved successfully',
            requests: requests.rows,
          });
        })
        .catch(() => {
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'could not retrieve requests',
          });
        }));
  }

  getOneRequest(req, res) {
    const requestid = parseInt(req.params.id, 10);
    const { userid } = req.body.token;

    const Query = {
      name: 'fetch-user',
      text: 'SELECT * FROM requests WHERE requestid = $1 AND userid = $2 ',
      values: [requestid, userid],
    };

    db.connect()
      .then(client => client.query(Query)
        .then((request) => {
          if (!request.rows[0]) {
            client.release();
            return res.status(404).json({
              status: 404,
              success: 'false',
              message: 'Request not found',
            });
          }
          client.release();
          return res.status(200).json({
            status: 200,
            success: 'true',
            message: 'Request retrieved successfully',
            request: request.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'could not retrieve request',
            error,
          });
        }));
  }

  createRequest(req, res) {
    const {
      userid, firstname, lastname, email, department,
    } = req.body.token;
    const { equipment, description } = req.body;
    const Query = {
      text: 'INSERT INTO requests(firstName, lastName, email, department, equipment, description, userid, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING requestId, firstName, lastName, email, department, equipment, description, status, date',
      values: [firstname, lastname, email, department, equipment, description, userid, 'pending'],
    };

    db.connect()
      .then(client => client.query(Query)
        .then((request) => {
          client.release();
          return res.status(201).json({
            status: 201,
            success: 'true',
            message: 'Request created successfully',
            request: request.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'Request not created',
            error,
          });
        }));
  }

  updateRequest(req, res) {
    const requestid = parseInt(req.params.id, 10);
    const {
      userid, firstname, lastname, email, department,
    } = req.body.token;
    const { equipment, description } = req.body;
    const Query = {
      text: 'UPDATE requests SET firstName = $1, lastName = $2, email = $3, department =$4, equipment = $5, description = $6 WHERE userid = $7 AND requestid = $8 RETURNING firstName, lastName, email, department, equipment, description, status',
      values: [firstname, lastname, email, department, equipment, description, userid, requestid],
    };

    db.connect()
      .then(client => client.query(Query)
        .then((request) => {
          client.release();
          return res.status(201).json({
            status: 201,
            success: 'true',
            message: `Request on ${equipment} updated successfully`,
            request: request.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'Request not updated',
            error,
          });
        }));
  }
}


const user = new User();
export default user;
