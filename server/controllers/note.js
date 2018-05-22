/* eslint-disable class-methods-use-this */
import db from '../db/index';

/**
 * @export
 * @class request
 */

class Request {
    /**
       * Get Multiple request record
       *
       * @param {object} req - HTTP Request
       * @param {object} res - HTTP Response
       * @returns {object} Class instance
       * @memberof Meals
       */
    /*get All Meals */
    getAll(req, res) {
        res.status(201).json({
            success: 'true',
            message: 'successfully retrieved all requests',
            requests: db.requests
        })
    }
    /**
         * Get a single request record
         *
         * @param {object} req - HTTP Request
         * @param {object} res - HTTP Response
         * @returns {object} Class instance
         * @memberof request
         */
    getOne(req, res) {
        const id = parseInt(req.params.id, 10);
        if (id > db.requests.length) {
            res.status(404).json({
                success: 'false',
                message: 'request not found'
            })
        }
        db.requests.find(request => {
            if (request.id === id) {
                return res.status(201).json({
                    success: 'true',
                    message: 'request sucessfuly retrieved',
                    request: request
                })
            }

        });
    }

    /* create meals */
    create(req, res) {
        const { option, status, description } = req.body
        db('requests')
            .returning('*')
            .insert({
                option,
                status,
                description,
                date: new Date()
            })
            .then(request => {
                res.json(request[0]);
            })
            .catch(err => res.status(400).json('unable to create request'))
    }

    /* update meals */
    update(req, res) {
        const id = parseInt(req.params.id, 10);
        let requestFound;
        let requestIndex;
        db.requests.find((request, index) => {
            if (request.id === id) {
                requestFound = request;
                requestIndex = index;
            }

        });
        if (!requestFound) {
            return res.status(404).json({
                success: 'false',
                message: 'request not found',
            });
        }

        const updatedRequest = {
            id: requestFound.id,
            name: req.body.name || requestFound.name,
            description: req.body.description || requestFound.description,
            department: req.body.department || requestFound.department,
            option: req.body.option || requestFound.option,
        };
        db.requests.splice(requestIndex, 1, updatedRequest);

        return res.status(200).json({
            success: 'true',
            message: 'request updated successfully',
            updatedRequest,
        });
        if (!requestFound) {
            res.status(404).json({
                success: 'false',
                message: 'request not found',
            });
        }
    }

    /* delete a request record */
    remove(req, res) {
        const id = parseInt(req.params.id, 10);
        db.requests.find((request, index) => {
            if (request.id === id) {
                db.requests.splice(index, 1);
                return res.status(202).json({
                    success: 'true',
                    message: 'request sucesfully deleted',
                });
            }
        });
        return res.status(404).json({
            success: 'false',
            message: 'request not found'
        })
    }
}

const request = new Request();
export default request;
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
    /*get All Users */
    
    login(req, res) {
        if (req.body.email === db.users[0].email && req.body.password === db.users[0].password) {
            res.status(200).json({
                success: 'true',
                message: 'success, you are now logged in',
                user: db.user
            })
        } else {
            res.status(400).json({
                success: 'false',
                message: 'error logging in'
            })
        }
    }
/**
     * Get a single user record
     *
     * @param {object} req - HTTP User
     * @param {object} res - HTTP Response
     * @returns {object} Class instance
     * @memberof user
     */
getOne(req, res) {
    const id = parseInt(req.params.id, 10);
    if (id > db.requests.length) {
        res.status(404).json({
            success: 'false',
            message: 'user not found'
        })
    }
    db.requests.find(user => {
        if (user.id === id) {
            return res.status(201).json({
                success: 'true',
                message: 'user sucessfuly retrieved',
                user: user
            })
        }

    });
}

/* create users */
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
        newUser: db.users[db.users.length - 1],
    });
}


/* update users */
update(req, res) {
    const id = parseInt(req.params.id, 10);
    let requestFound;
    let requestIndex;
    db.requests.find((user, index) => {
        if (user.id === id) {
            requestFound = user;
            requestIndex = index;
        }

    });
    if (!requestFound) {
        return res.status(404).send({
            success: 'false',
            message: 'user not found',
        });
    }

    const updatedRequest = {
        id: requestFound.id,
        name: req.body.name || requestFound.name,
        description: req.body.description || requestFound.description,
        department: req.body.department || requestFound.department,
        option: req.body.option || requestFound.option,
    };
    db.requests.splice(requestIndex, 1, updatedRequest);

    return res.status(200).json({
        success: 'true',
        message: 'user updated successfully',
        updatedRequest,
    });
    if (!requestFound) {
        res.status(404).json({
            success: 'false',
            message: 'user not found',
        });
    }
}

/* delete a user record */
remove(req, res) {
    const id = parseInt(req.params.id, 10);
    db.requests.find((user, index) => {
        if (user.id === id) {
            db.requests.splice(index, 1);
            return res.status(202).json({
                success: 'true',
                message: 'user sucesfully deleted',
            });
        }
    });
    return res.status(404).json({
        success: 'false',
        message: 'user not found'
    })
}
}
const user = new User();
export default user;