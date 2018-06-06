import db from '../models/index';

const validateRequest = (req, res, next) => {
  const requestid = parseInt(req.params.id, 10);
  const Query = {
    name: 'fetch-user',
    text: 'SELECT status FROM requests WHERE userid = $1 AND requestid = $2',
    values: [req.body.token.userid, requestid],
  };

  db.connect()
    .then((client) => {
      return client.query(Query)
        .then((request) => {
          if (request.rows[0].status !== 'pending') {
            client.release();
            return res.status(403).json({
              status: 'fail',
              message: 'bad request.Request can not be accessed!',
            });
          }
          client.release();
          return next();
        })
        .catch((error) => {
          client.release();
          res.status(400).json({
            status: 'false',
            message: 'could not retrieve request',
            error,
          });
        });
    });
};

export default validateRequest;
