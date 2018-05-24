import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db/index.js';

dotenv.config();

const authenticate = (req, res, next) => {
    /* * *
       *check header or url parameters or post parameters for token
    //    ** */
    const token = req.headers['x-access-token'] || req.query.token || req.body.token;
    // verify a token symmetric
    return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Failed to authenticate token, please sign in'
            });
        }


        const Query = {
            text: 'SELECT * FROM users WHERE email $1',
            values: [decoded.email],
        }

        db.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        })
        db.connect()
            .then(client => {
                client.query(Query)
                    .then(user => {
                        if(user) {
                           return next();
                        }
                        res.status(404).json({
                            success: false,
                            message: 'null value returned'
                        })
                    });

            });
        next();
    });
}

export default authenticate;