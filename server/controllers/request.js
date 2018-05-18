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
        const id = parseInt(req.params.id, 10);
        let found = true;
        db.requests.find(request => {
            found = true;
            if (request.id === id) {
                return res.status(201).json({
                    success: 'true',
                    message: 'request found',
                    request: request
                })
            }
            if (!found) {
                res.status(404).json({
                    success: 'false',
                    message: 'request not found'
                })
            }
        });
    }

    create(req, res) {
        const id = parseInt(req.params.id, 10);
        const { name, option, department, description } = req.body
        db.requests.push({
            id: db.requests.length + 1,
            name,
            option,
            department,
            description,
            date: new Date()
        })
        res.status(201).json({
            success: 'true',
            message: 'successfully created new request',
            newRequest: db.requests[db.requests.length - 1]
        });
    }

    update(req, res) {

    }

    remove(req, res) {

    }
}
const request = new Request();
export default request;