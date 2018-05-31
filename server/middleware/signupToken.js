import bcrypt from 'bcryptjs';
import db from '../models/index';
import auth from '../middleware/auth';

const getToken = (req, res) => {
  const { email, password } = req.body;
  const Query = {
    // give the query a unique name
    name: 'fetch-user',
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };
  db.connect()
    .then(client => client.query(Query)
      .then((user) => {
        if (!user.rows[0]) {
          res.status(404).json({
            status: 'fail',
            message: 'User not found',
          });
        }

        const checkPassword = bcrypt
          .compareSync(password.trim(), user.rows[0].password);
        if (!checkPassword) {
          return res.status(400).json({
            status: 'fail',
            message: 'Wrong password',
          });
        }
        const authToken = auth.token(user.rows[0]);
        client.release();
        return res.status(200).json({
          status: 'success',
          message: 'Sign up successful',
          token: authToken,
        });
      })
      .catch((err) => {
        client.release();
        return res.status(500).json({
          status: 'error',
          message: 'oops!something went wrong!',
          err,
        });
      }));
};
export default getToken;
