/* eslint-disable class-methods-use-this */
import db from '../models/index';
/**
 * @export
 * @class request
 */

class Request {
  /**
  * @param {object} request - HTTP Request
  * @param {object} response - HTTP Response
  * @returns {object} Class instance
  * @description Admin request page.
  */
  getAll(req, res) {
    db.connect()
      .then(client => client.query('SELECT * from requests')
        .then((requests) => {
          if (!requests.rows[0]) {
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
            error,
          });
        }));
  }

  getOne(req, res) {
    const requestid = parseInt(req.params.id, 10);
    const Query = {
      name: 'fetch-user',
      text: 'SELECT * FROM requests WHERE requestid = $1',
      values: [requestid],
    };

    db.connect()
      .then(client => client.query(Query)
        .then((requests) => {
          if (!requests.rows[0]) {
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
            requests: requests.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          return res.status(400).json({
            success: 'false',
            message: 'could not retrieve requests',
            error,
          });
        }));
  }

  // When this route is called status  === pending
  approve(req, res) {
    const requestid = parseInt(req.params.id, 10);
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE requestid= $2 RETURNING userid, equipment, description, status',
      values: ['approved', requestid],
    };

    db.connect()
      .then(client => client.query(Query)
        .then((request) => {
          if (!request.rows[0]) {
            client.release();
            return res.status(404).json({
              success: 'false',
              message: 'Request not found',
            });
          // } else if (request.rows[0].status === 'resolved') {
          //   client.release();
          //   return res.status(400).json({
          //     success: 'false',
          //     message: 'Resolved request can not be approved',
          //   });
          }
          client.release();
          return res.status(201).json({
            success: 'true',
            message: 'Request has been approved',
            updatedRequest: request.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          res.status(400).json({
            success: 'false',
            message: 'invalid request',
            error,
          });
        }));
  }

  disapprove(req, res) {
    const requestid = parseInt(req.params.id, 10);
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE requestid = $2 RETURNING equipment, description, status',
      values: ['disapproved', requestid],
    };

    db.connect()
      .then(client => client.query(Query)
        .then((request) => {
          if (!request.rows[0]) {
            client.release();
            return res.status(404).json({
              success: 'false',
              message: 'Request not found',
            });
          }
          client.release();
          return res.status(201).json({
            success: 'true',
            message: 'Request has been dissapproved',
            updatedRequest: request.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          return res.status(400).json({
            success: 'false',
            message: 'invalid request',
            error,
          });
        }));
  }

  resolve(req, res) {
    const requestid = parseInt(req.params.id, 10);
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE requestid = $2 RETURNING userid, equipment, description, status',
      values: ['resolved', requestid],
    };

    db.connect()
      .then(client => client.query(Query)
        .then((request) => {
          if (!request.rows[0]) {
            client.release();
            return res.status(404).json({
              success: 'false',
              message: 'Request not found',
            });
          }
          client.release();
          return res.status(201).json({
            success: 'true',
            message: 'Request has been resolved',
            updatedRequest: request.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          return res.status(400).json({
            success: 'false',
            message: 'invalid request',
            error,
          });
        }));
  }
}

const request = new Request();
export default request;
