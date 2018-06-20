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
    const { userid } = req.body.token;
    const {
      equipment,
      description,
    } = req.body;

    const query = {
      text: 'INSERT INTO requests(equipment, description, userid, status) VALUES($1, $2, $3, $4) RETURNING requestId, userid, equipment, description, status, date;',
      values: [equipment, description, userid, 'pending'],
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
          client.release(error);
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'Request not created',
            error
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
        .catch((error) => {
          client.release(error);
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
    if (isNaN(requestid)) {
      return res.status(400).json({
        status: 400,
        success: 'false',
        message: 'Request id is not a string'
      });
    }
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
          client.release(error);
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'Invalid Request',
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
    if (isNaN(requestid)) {
      return res.status(400).json({
        success: 'false',
        status: 400,
        message: 'Request id is not a string'
      });
    }
    const {
      userid,
    } = req.body.token;

    const {
      equipment,
      description,
    } = req.body;

    const query = {
      text: 'UPDATE requests SET equipment = $1, description = $2 WHERE userid = $3 AND requestid = $4 RETURNING requestid, userid, equipment, description, status;',
      values: [equipment, description, userid, requestid],
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
          client.release(error);
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'Invalid Request',
          });
        }));
  }
}

const userRequest = new UserRequest();
export default userRequest;
