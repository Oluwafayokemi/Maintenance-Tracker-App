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
        let found = false;
        db.requests.find(request => {
            if (request.id === id) {
                found = true;
                return res.status(201).json({
                    success: 'true',
                    message: 'request sucessfuly retrieved',
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
            return res.status(404).send({
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