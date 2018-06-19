/* eslint-disable class-methods-use-this */
import db from '../models/index';

/**
 * @export
 * @class userRequest
 */
class UserRequest {
  /**
   * @param {object} request - HTTP UserRequest
   * @param {object} response - HTTP Response
   * @returns {object} Class instance
   * @description default user create a new request.
   */

  create(req, res) {
    const {
      userid,
      firstname,
      lastname,
      email,
      department,
    } = req.body.token;

    const {
      equipment,
      description,
    } = req.body;

    const query = {
      text: 'INSERT INTO requests(firstName, lastName, email, department, equipment, description, userid, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING requestId, firstName, lastName, email, department, equipment, description, status, date;',
      values: [firstname, lastname, email, department, equipment, description, userid, 'pending'],
    };

    db.connect()
      .then(client => client.query(query)
        .then((request) => {
          client.release(request);
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

  /**
   * @param {object} request - HTTP UserRequest
   * @param {object} response - HTTP Response
   * @returns {object} Class instance
   * @description default user gets only his own list of all previous request.
   */

  getAll(req, res) {
    const queryString = {
      name: 'fetch-user',
      text: 'SELECT * FROM requests WHERE userid = $1;',
      values: [req.body.token.userid],
    };
    db.connect()
      .then(client => client.query(queryString)
        .then((requests) => {
          client.release(requests);
          if (!requests.rows) {
            return res.status(404).json({
              status: 404,
              success: 'false',
              message: 'Request does not exist',
            });
          }
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

  /**
   * @param {object} request - HTTP UserRequest
   * @param {object} response - HTTP Response
   * @returns {object} Class instance
   * @description default user gets one of the previous request by Id.
   */

  getOne(req, res) {
    const requestid = parseInt(req.params.id, 10);
    const {
      userid,
    } = req.body.token;

    const query = {
      name: 'fetch-user',
      text: 'SELECT * FROM requests WHERE requestid = $1 AND userid = $2 LIMIT 1;',
      values: [requestid, userid],
    };

    db.connect()
      .then(client => client.query(query)
        .then((request) => {
          client.release(request);
          if (!request.rows[0]) {
            return res.status(404).json({
              status: 404,
              success: 'false',
              message: 'Request does not exist',
            });
          }
          return res.status(200).json({
            success: 'true',
            message: 'all requests retrieved successfully',
            request: request.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'Invalid Request Id',
            error,
          });
        }));
  }

  /**
   * @param {object} request - HTTP UserRequest
   * @param {object} response - HTTP Response
   * @returns {object} Class instance
   * @description default user updates an existing request only if the request is still pending.
   */

  update(req, res) {
    const requestid = parseInt(req.params.id, 10);
    const {
      userid,
      firstname,
      lastname,
      email,
      department,
    } = req.body.token;

    const {
      equipment,
      description,
    } = req.body;

    const query = {
      text: 'UPDATE requests SET firstName = $1, lastName = $2, email = $3, department =$4, equipment = $5, description = $6 WHERE userid = $7 AND requestid = $8 RETURNING firstName, lastName, email, department, equipment, description, status;',
      values: [firstname, lastname, email, department, equipment, description, userid, requestid],
    };

    db.connect()
      .then(client => client.query(query)
        .then((request) => {
          client.release(request);
          if (!request.rows[0]) {
            return res.status(404).json({
              status: 404,
              success: 'false',
              message: 'Request does not exist',
            });
          } else if (request.rows[0].status !== 'pending') {
            return res.status(403).json({
              status: 403,
              success: 'false',
              message: 'Request can no longer be modified because Admin has already acted on the request',
            });
          }
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
            message: 'Invalid Request Id',
            error,
          });
        }));
  }
}

const userRequest = new UserRequest();
export default userRequest;