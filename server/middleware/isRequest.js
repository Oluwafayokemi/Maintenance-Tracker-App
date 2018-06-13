/* eslint-disable class-methods-use-this */
import db from '../models/index';

class IsRequest {
  /**
   * @param {object} request - HTTP Request
   * @param {object} response - HTTP Response
   * @returns {object} Found Request
   * @description check admin request page.
   */

  isResolved(req, res, next) {
    const requestid = parseInt(req.params.id, 10);

    const Query = {
      name: 'fetch-user',
      text: 'SELECT * FROM requests WHERE requestid = $1 LIMIT 1;',
      values: [requestid],
    };

    db.connect()
      .then(client => client.query(Query)
        .then((request) => {
          client.release();
          if (request.rows[0].status === 'resolved') {
            return res.status(403).json({
              status: 403,
              success: 'false',
              message: 'Request has already been resolved, it can not be approved',
            });
          }
          return next();
        })
        .catch((error) => {
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'Resoved request can not be edited',
            err: error,
          });
        }));
  }

  resolveCheck(req, res, next) {
    const requestid = parseInt(req.params.id, 10);

    const Query = {
      name: 'fetch-user',
      text: 'SELECT * FROM requests WHERE requestid = $1 LIMIT 1;',
      values: [requestid],
    };

    db.connect()
      .then(client => client.query(Query)
        .then((request) => {
          client.release();
          if (request.rows[0].status === 'disapproved' || request.rows[0].status === 'pending') {
            return res.status(403).json({
              status: 403,
              success: 'false',
              message: 'Only approved request can be resolved',
            });
          }
          return next();
        })
        .catch((error) => {
          client.release();
          return res.status(400).json({
            status: 400,
            success: 'false',
            message: 'could not retrieve requests',
            err: error,
          });
        }));
  }
}
const isRequest = new IsRequest();
export default isRequest;
