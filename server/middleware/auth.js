import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secret = process.env.SECRET_KEY;

class jwts {
  /**
   * @description Method to generate token
   *
   * @param {Object} user
   *
   * @return {String} Returned token
   */
  static token(user) {
    const { userid, isadmin } = user;
    const userDetails = { userid, isadmin };
    const authToken = jwt.sign(
      userDetails, secret,
      { expiresIn: '1d' },
    );

    return authToken;
  }
}

export default jwts;
