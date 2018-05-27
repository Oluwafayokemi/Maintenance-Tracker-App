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


    describe('GET /requests', () => {
        it('should return 401 when token is invalid', (done) => {
            request.get('/api/v1/users/requests')
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(401);
                    expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
                    process.env.TOKEN = res.body.token;
                });
            done();
        });
        it('should return 401 when token is invalid', (done) => {
            request.get('/api/v1/users/requests/1')
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(401);
                    expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
                    process.env.TOKEN = res.body.token;
                });
            done();
        });
    });
});