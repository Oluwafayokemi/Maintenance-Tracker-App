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
      .then((client) => {
        return client.query('SELECT * from requests')
          .then((requests) => {
            if (!requests.rows[0]) {
              return res.status(404).json({
                success: 'false',
                message: 'Request not found',
              });
            }
            client.release();
            res.status(200).json({
              success: 'true',
              message: 'all requests retrieved successfully',
              requests: requests.rows,
            });
          })
          .catch((error) => {
            res.status(400).json({
              success: 'false',
              message: 'could not retrieve requests',
              error,
            });
          });
      });
  }
  // When this route is called status  === pending
  approve(req, res) {
    const Id = parseInt(req.params.id, 10);
    const { email } = req.body.token;
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE email = $2 AND Id = $3',
      values: ['approved', email, Id],
    };
    db.connect()
      .then((client) => {
        return client.query(Query)
          .then((request) => {
            client.release();
            res.status(201).json({
              success: 'true',
              message: 'Request has been approved',
            });
          })
          .catch((error) => {
            client.release();
            res.status(400).json({
              success: 'false',
              message: 'Request not updated',
              error,
            });
          });
      });
  }

  disapprove(req, res) {
    const Id = parseInt(req.params.id, 10);
    const { email } = req.body.token;
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE email = $2 AND Id = $3',
      values: ['dissapproved', email, Id],
    };
    db.connect()
      .then((client) => {
        return client.query(Query)
          .then((request) => {
            client.release();
            res.status(201).json({
              success: 'true',
              message: 'Request has been dissapproved',
              request: request.rows[0],
            });
          })
          .catch((error) => {
            res.status(400).json({
              success: 'false',
              message: 'Request not updated',
              error,
            });
          });
      });
  }

  resolve(req, res) {
    const Id = parseInt(req.params.id, 10);
    const { email } = req.body.token;
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE email = $2 AND Id = $3',
      values: ['resolved', email, Id],
    };
    db.connect()
      .then((client) => {
        return client.query(Query)
          .then((request) => {
            client.release();
            res.status(201).json({
              success: 'true',
              message: 'Request has been resolved',
              request: request.rows[0],
            });
          })
          .catch((error) => {
            res.status(400).json({
              success: 'false',
              message: 'Request not updated',
              error,
            });
          });
      });
  }
}

const request = new Request();
export default request;
