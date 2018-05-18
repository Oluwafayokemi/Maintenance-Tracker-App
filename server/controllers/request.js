import db from '../db/db';

class Request {
    getAll(req, res) {
        res.status(201).json({
            success: 'true',
            message: 'successfully retrieved all requests',
            requests: db.requests
        })
    }

    getOne(req, res) {

    }

    create(req, res) {

    }

    update(req, res) {

    }

    remove(req, res) {

    }
}
const request = new Request();
export default request;