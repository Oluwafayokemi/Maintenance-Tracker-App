/* global describe, it */
import chai from 'chai';
import jwtDecode from 'jwt-decode';
import supertest from 'supertest';
import app from '../app';
import testInit from './testInit';

const request = supertest(app);
const { expect } = chai;
const testVariables = new testInit();

describe('Creating a new request', () => {
    let decodedToken;
    let token;
    let requestId;

    describe('/GET /api/v1/requests', () => {
        it('should return 200 response for getting all users requests', (done) => {
            request
            .get('/api/v1/requests')
            .set('x-access-token', token)
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@222', token)
            .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('all requests retrieved successfully');
                    done();
                });
        });
    });
});