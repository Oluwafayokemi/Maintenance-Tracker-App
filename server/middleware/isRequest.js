/* eslint-disable class-methods-use-this */
import db from '../models/index';
/**
 * @param {object} request - HTTP Request
 * @param {object} response - HTTP Response
 * @returns {object} Found Request
 * @description Admin request page.
 */
const isRequest = (req, res, next) => {
  const Id = parseInt(req.params.id, 10);

  const Query = {
    name: 'fetch-user',
    text: 'SELECT * FROM requests WHERE Id = $1',
    values: [Id],
  };
  db.connect()
    .then(client => client.query(Query)
      .then((requests) => {
        if (!requests.rows[0]) {
          return res.status(404).json({
            success: 'false',
            message: 'Request not found',
          });
        }
        client.release();
        return next();
      })
      .catch((error) => {
        res.status(400).json({
          success: 'false',
          message: 'could not retrieve requests',
        });
      }));
};
export default isRequest;
