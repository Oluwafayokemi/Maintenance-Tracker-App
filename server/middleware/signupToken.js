import bcrypt from 'bcryptjs';
import db from '../models/index';
import auth from './auth';

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
          client.release();
          return res.status(404).json({
            status: 404,
            success: 'false',
            message: 'User not found',
          });
        }

        const checkPassword = bcrypt
          .compareSync(password.trim(), user.rows[0].password);
        if (!checkPassword) {
          client.release();
          return res.status(401).json({
            status: 401,
            success: 'false',
            message: 'Wrong password',
          });
        }
        const authToken = auth.token(user.rows[0]);
        client.release();
        return res.status(200).json({
          status: 200,
          success: 'true',
          message: 'Sign up successful',
          token: authToken,
          newUser: {
            firstName: user.rows[0].firstname,
            lastName: user.rows[0].lastname,
            email: user.rows[0].email,
            department: user.rows[0].department,
            isAdmin: user.rows[0].isadmin,
          },
        });
      })
      .catch((error) => {
        client.release();
        return res.status(403).json({
          status: 403,
          success: 'false',
          message: 'invalid action',
          error,
        });
      }));
};

export default getToken;
