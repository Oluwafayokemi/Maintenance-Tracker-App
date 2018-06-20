/* eslint-disable class-methods-use-this */
import db from '../models/index';
/**
 * @export
 * @class request
 */

class AdminRequest {
  /**
  * @param {object} request - HTTP Request
  * @param {object} response - HTTP Response
  * @returns {object} Class instance
  * @description gets all the request created by all users.
  */

  getAll(req, res) {
    const queryString = {
      name: 'fetch-user',
      text: 'SELECT requests.requestid, users.firstname, users.lastname, users.email, users.department, requests.equipment, requests.description, requests.status FROM requests, users',
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
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'Invalid request',
            error
          });
        }));
  }

  /**
  * @param {object} request - HTTP Request
  * @param {object} response - HTTP Response
  * @returns {object} Class instance
  * @description gets one the request created by an authenticated user by Id.
  */

  getOne(req, res) {
    const requestid = parseInt(req.params.id, 10);
    const Query = {
      name: 'fetch-user',
      text: 'SELECT * FROM requests WHERE requestid = $1 LIMIT 1;',
      values: [requestid],
    };

    db.connect()
      .then(client => client.query(Query)
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
            message: 'Invalid Request',
          });
        }));
  }

  /**
   * @param {object} request - HTTP Request
   * @param {object} response - HTTP Response
   * @returns {object} Class instance
   * @description approves a request.
   */

  approve(req, res) {
    const requestid = parseInt(req.params.id, 10);
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE requestid= $2 RETURNING userid, equipment, description, status;',
      values: ['approved', requestid],
    };

    db.connect()
      .then(client => client.query(Query)
        .then((request) => {
          client.release(request);
          return res.status(201).json({
            status: 201,
            success: 'true',
            message: 'Request has been approved',
            updatedRequest: request.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'Invalid Request',
          });
        }));
  }

  /**
 * @param {object} request - HTTP Request
 * @param {object} response - HTTP Response
 * @returns {object} Class instance
 * @description disapproves a request.
 */

  disapprove(req, res) {
    const requestid = parseInt(req.params.id, 10);
    const query = {
      text: 'UPDATE requests SET status = $1 WHERE requestid = $2 RETURNING equipment, description, status;',
      values: ['disapproved', requestid],
    };

    db.connect()
      .then(client => client.query(query)
        .then((request) => {
          client.release(request);
          return res.status(201).json({
            status: 201,
            success: 'true',
            message: 'Request has been dissapproved',
            updatedRequest: request.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'Invalid Request',
          });
        }));
  }

  /**
 * @param {object} request - HTTP Request
 * @param {object} response - HTTP Response
 * @returns {object} Class instance
 * @description resolves a request.
 */

  resolve(req, res) {
    const requestid = parseInt(req.params.id, 10);
    const query = {
      text: 'UPDATE requests SET status = $1 WHERE requestid = $2 RETURNING userid, equipment, description, status;',
      values: ['resolved', requestid],
    };

    db.connect()
      .then(client => client.query(query)
        .then((request) => {
          client.release(request);
          return res.status(201).json({
            status: 201,
            success: 'true',
            message: 'Request has been resolved',
            updatedRequest: request.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'Invalid Request',
          });
        }));
  }
}

const adminRequest = new AdminRequest();
export default adminRequest;
