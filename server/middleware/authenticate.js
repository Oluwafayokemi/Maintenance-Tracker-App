import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db/index.js';

dotenv.config();

const authenticate = (req, res, next) => {
    try {
        const token = req.headers['x-access-token'] || req.query.token || req.body.token;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.body.token = decoded;
    } catch (error) {
        return res.status(401).json({
            status: 'failed',
            message: 'Invalid token'
        });
    }
   next();
}

export default authenticate;