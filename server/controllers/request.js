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
    db.on('error', (err, client) => {
      res.json('Unexpected error on idle client', err);
      process.exit(-1);
    });

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
  // When this route is called status  === pending
  approve(req, res) {
    const Id = parseInt(req.params.id, 10);
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE Id = $2',
      values: ['approved', Id],
    };

    db.on('error', (err, client) => {
      res.json('Unexpected error on idle client', err);
      process.exit(-1);
    });
    db.connect()
      .then(client => client.query(Query)
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
        }));
  }

  disapprove(req, res) {
    const Id = parseInt(req.params.id, 10);
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE Id = $2',
      values: ['disapproved', Id],
    };

    db.on('error', (err, client) => {
      res.json('Unexpected error on idle client', err);
      process.exit(-1);
    });

    db.connect()
      .then(client => client.query(Query)
        .then((request) => {
          client.release();
          res.status(201).json({
            success: 'true',
            message: 'Request has been dissapproved',
            request: request.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          res.status(400).json({
            success: 'false',
            message: 'Request not updated',
            error,
          });
        }));
  }

  resolve(req, res) {
    const Id = parseInt(req.params.id, 10);
    const Query = {
      text: 'UPDATE requests SET status = $1 WHERE Id = $2',
      values: ['resolved', Id],
    };

    db.on('error', (err, client) => {
      res.json('Unexpected error on idle client', err);
      process.exit(-1);
    });

    db.connect()
      .then(client => client.query(Query)
        .then((request) => {
          client.release();
          res.status(201).json({
            success: 'true',
            message: 'Request has been resolved',
            request: request.rows[0],
          });
        })
        .catch((error) => {
          client.release();
          res.status(400).json({
            success: 'false',
            message: 'Request not updated',
            error,
          });
        }));
  }
}

const request = new Request();
export default request;
