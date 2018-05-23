/* eslint-disable class-methods-use-this */
import db from '../db/index';
import bcrypt from 'bcryptjs';

/**
 * @export
 * @class user
 */

class User {
    /**
       * Get Multiple user record
       *
       * @param {object} req - HTTP User
       * @param {object} res - HTTP Response
       * @returns {object} Class instance
       * @memberof Users
       */
    /* create users */
    create(req, res) {
        const salt = bcrypt.genSaltSync(Math.floor(Math.random() * 5));

        const { firstName, lastName, email, department, role, password } = req.body;
        const Query = {
            text: 'INSERT INTO users (firstName, lastName, email, role, department, password) VALUES($1, $2, $3, $4, $5, $6)',
            values: [firstName, lastName, email, department, role, password],
        }

        db.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        })
        db.connect()
            .then(client => {
                client.query(Query)
                .then(user => res.status(200).json({
                    success: 'true',
                    message: 'users created succesfully',
                    user
                }))
                .catch(error => res.status(400).json({
                    success: 'false',
                    message: 'could not create users',
                }))
            });
    }


}
const user = new User();
export default user;