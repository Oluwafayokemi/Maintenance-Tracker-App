/* global describe, it */
import chai from 'chai';
import jwtDecode from 'jwt-decode';
import supertest from 'supertest';
import app from '../app';
import testInit from './testInit';

const request = supertest(app);
const { expect } = chai;
const testVariables = new testInit();

describe('Request for users', () => {
    describe('login user', () => {
        it('should return a status 200 success response for logging in a user', (done) => {
            request.post('/api/v1/auth/login')
                .send({
                    email: testVariables.defaultEmail,
                    password: testVariables.defaultPsw,
                })
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(200);
                    expect(res.body).to.haveOwnProperty('token');
                    expect(res.body).to.haveOwnProperty('message').to.equal('signin successful');
                    token = res.body.token;
                });
            done();
        });
    })

    describe('/POST /api/v1/users/requests', () => {

        it('should return 401 response for no token', done => {
            request
                .post('/api/v1/users/requests')
                .set('x-access-token', 'busywuh2uy32hewy32.979ir7493ri4fii')
                .send({
                    email: 'john@gmail.com',
                    option: 'saiolr',
                    description: 'password',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                    expect(res.body).to.be.an("object");
                    expect(res.body)
                        .to.haveOwnProperty("message")
                        .to.equal("Invalid token");
                });
            done();
        });

        it('should return 400 response for an empty option field', (done) => {
            request
                .post('/api/v1/users/requests')
                .send({
                    email: 'ayoaright@gmail.com',
                    option: '',
                    description: 'password',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                });
            done();
        });

        it('should return 400 response for an empty description field', (done) => {
            request
                .post('/api/v1/users/requests')
                .send({
                    email: 'siaright@gmail.com',
                    option: 'option',
                    description: ''
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                });
            done();
        });

        it('should return 400 response for an empty email field', (done) => {
            request
                .post('/api/v1/users/requests')
                .send({
                    email: '',
                    option: testVariables.demoRequestsOption,
                    description: testVariables.demoRequestDescrp
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                });
            done();
        });

        it('should return 400 response if option is not a string', (done) => {
            request
                .post('/api/v1/users/requests')
                .send({
                    email: testVariables.demoUserEmail,
                    option: 8,
                    description: testVariables.demoRequestDescrp
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                });
            done();
        });

        it('should return 400 response if description is not a string', (done) => {
            request
                .post('/api/v1/users/requests')
                .send({
                    email: testVariables.demoUserEmail,
                    option: testVariables.demoRequestsOption,
                    description: 7
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                });
            done();
        });
        it('should return 201 response for creating a request', (done) => {
            request
                .post('/api/v1/users/requests')
                .send({
                    email: testVariables.demoUserEmail,
                    option: testVariables.demoRequestsOption,
                    description: testVariables.demoRequestDescrp
                })
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('Request Created for ${email}');
                });
            done();
        });
    });

    describe('/GET /api/v1/users/requests/', () => {
        it('should return 404 for trying to get a request with an id parameter, but no token', (done) => {
            request.get('/api/v1/users/requests')
                .set('x-access-token', 'busywuh2uy32hewy32.979ir7493ri4fii')
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
                });
            done();
        });

        it('should return 201 response for getting a users requests', (done) => {
            request.get('/api/v1/users/requests')
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('request sucessfuly retrieved');
                });
            done();
        });
    });
});