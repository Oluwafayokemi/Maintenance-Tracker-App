/* eslint-disable class-methods-use-this */
import db from '../models/index';

/**
 * @export
 * @class request
 */

class Request {
  /**
       * Get Multiple request record
       *
       * @param {object} req - HTTP Request
       * @param {object} res - HTTP Response
       * @returns {object} Class instance
       * @memberof Requests
       */
  /* get All Requests */

  getAll(req, res) {
    db.connect()
      .then((client) => {
        client.query('SELECT * from requests')
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
// When this route is called status  === pending
  approve(req, res) {
    const Id = parseInt(req.params.id, 10);
    const { email } = req.body.token;
    const { status } = req.body;
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE email = $2 AND Id = $3',
      values: ['pending', email, Id],
    };
    db.connect()
      .then((client) => {
        client.query(Query)
          .then((request) => {
            if (Id < db.length) {
              res.status(404).json({
                status: 'fail',
                message: 'Request was not found',
              });
            }
            return res.status(200).json({
              status: 'success',
              message: `Request ${status} updated successfully`,
              request: request.rows[0],
            })
              .catch((error) => {
                res.status(400).json({
                  success: 'false',
                  message: 'Request not created',
                  error,
                });
              });
          });
      });
  }

  dissaprove(req, res) {
    const Id = parseInt(req.params.id, 10);
    const { email } = req.body.token;
    const { status } = req.body;
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE email = $2 AND Id = $3',
      values: ['dissaprove', email, Id],
    };
    db.connect()
      .then((client) => {
        client.query(Query)
          .then((request) => {
            if (Id < db.length) {
              res.status(404).json({
                status: 'fail',
                message: 'Request was not found',
              });
            }
            return res.status(200).json({
              status: 'success',
              message: `Request ${status} updated successfully`,
              request: request.rows[0],
            })
              .catch((error) => {
                res.status(400).json({
                  success: 'false',
                  message: 'Request not created',
                  error,
                });
              });
          });
      });
  }

  resolve(req, res) {
    const Id = parseInt(req.params.id, 10);
    const { email } = req.body.token;
    const { status } = req.body;
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE email = $2 AND Id = $3',
      values: ['resolve', email, Id],
    };
    db.connect()
      .then((client) => {
        client.query(Query)
          .then((request) => {
            if (Id < db.length) {
              res.status(404).json({
                status: 'fail',
                message: 'Request was not found',
              });
            }
            return res.status(200).json({
              status: 'success',
              message: `Request ${status} updated successfully`,
              request: request.rows[0],
            })
              .catch((error) => {
                res.status(400).json({
                  success: 'false',
                  message: 'Request not created',
                  error,
                });
              });
          });
      });
  }
}

const request = new Request();
export default request;
