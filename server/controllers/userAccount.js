/* eslint-disable class-methods-use-this */
import db from '../db/index';

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
    /*create a user */
    create(req, res) {
        const { firstName, lastName, email, department } = req.body
        db('users').insert({
            firstName,
            lastName,
            email,
            department,
            joined: new Date()
        }).then(console.log)
        res.status(201).json({
            success: 'true',
            message: 'successfully created new user',
            newUser: db.users[db.users.length-1],
        });
    }
}

const user = new User();
export default user;