import bcrypt from 'bcryptjs';
import db from '../models/index';
import auth from '../middleware/auth';

const getToken = (req, res) => {
  const { email, password, firstName, lastName, department } = req.body;
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
          client.release();
          res.status(404).json({
            success: 'false',
            message: 'User not found',
          });
        }

        const checkPassword = bcrypt
          .compareSync(password.trim(), user.rows[0].password);
        if (!checkPassword) {
          client.release();
          return res.status(400).json({
            success: 'false',
            message: 'Wrong password',
          });
        }
        const authToken = auth.token(user.rows[0]);
        client.release();
        return res.status(200).json({
          success: 'true',
          message: 'Sign up successful',
          token: authToken,
          newUser: {
            id: user.rows[0].id,
            firstName,
            lastName,
            email,
            department,
          },
        });
      })
      .catch((err) => {
        client.release();
        return res.status(500).json({
          success: 'false',
          message: 'oops!something went wrong!',
          err,
        });
      }));
};

export default getToken;
