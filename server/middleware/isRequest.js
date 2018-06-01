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
  db.on('error', (err, client) => {
    res.json('Unexpected error on idle client', err);
    process.exit(-1);
  });
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
        return next();
      })
      .catch((error) => {
        client.release();
        return res.status(400).json({
          success: 'false',
          message: 'could not retrieve requests',
        });
      }));
};
export default isRequest;
