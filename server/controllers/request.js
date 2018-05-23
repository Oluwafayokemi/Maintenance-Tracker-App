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
       * @memberof Requests
       */
    /*get All Requests */

    getAll(req, res) {
        db.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        })
        db.connect()
            .then(client => {
                client.query('SELECT * from requests')            
                    .then(requests => res.status(200).json({
                        success: 'true',
                        message: 'all requests retrieved successfully',
                        requests: requests.rows
                    }))
                    .catch(error => res.status(400).json({
                        success: 'false',
                        message: 'could not retrieve requests',
                    }))
            });
    }
}

const request = new Request();
export default request;