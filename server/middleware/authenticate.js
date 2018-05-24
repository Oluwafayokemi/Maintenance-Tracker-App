import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db/index.js';

dotenv.config();

const authenticate = (req, res, next) => {
    /* * *
       *check header or url parameters or post parameters for token
    //    ** */
    let headerToken = req.headers.authorization.split(' ');
    const header = headerToken[1];
    const token = header || req.query.token || req.headers['x-access-token'] || req.body.token;
    try {
        const token = jwt.verify(token, process.env.SECRET_KEY);
        req.body.token = token;
        done()
    }

    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Failed to authenticate token, please sign in'
        });
    }
};

export default authenticate;