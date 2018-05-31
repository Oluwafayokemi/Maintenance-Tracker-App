import db from '../models/index';

const isAdmin = (req, res, next) => {
  const Query = {
    name: 'fetch-user',
    text: 'SELECT * FROM users WHERE email = $1;',
    values: [req.body.token.email],
  };
  db.connect()
    .then((client) => {
      return client.query(Query)
        .then((user) => {
          if (user.rows[0].isadmin === false) {
            return res.status(403).json({
              status: 'fail',
              message: 'bad request!Request can only be accessed by an admin!',
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
export default isAdmin;
