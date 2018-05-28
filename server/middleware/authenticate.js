import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticate = (req, res, next) => {
    try {
        let token = req.headers['x-access-token'] || req.query.token || req.body.token;
        if(process.env.NODE_ENV === 'test'){
            token=process.env.testToken;
        } 
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