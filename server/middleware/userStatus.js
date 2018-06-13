import db from '../models/index';

const validateRequest = (req, res, next) => {
  const requestid = parseInt(req.params.id, 10);
  const Query = {
    name: 'fetch-user',
    text: 'SELECT status FROM requests WHERE userid = $1 AND requestid = $2;',
    values: [req.body.token.userid, requestid],
  };

  db.connect()
    .then(client => client.query(Query)
      .then((request) => {
        client.release();
        if (request.rows[0].status !== 'pending') {
          return res.status(403).json({
            status: 403,
            success: 'false',
            message: 'bad request.Request can not be accessed!',
          });
        }
        return next();
      })
      .catch((error) => {
        client.release();
        return res.status(401).json({
          status: 401,
          success: 'false',
          message: 'could not retrieve request',
          error,
        });
      }));
};

export default validateRequest;
