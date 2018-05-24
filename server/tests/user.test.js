/* global describe, it */

import chai from 'chai';
import supertest from 'supertest';
import faker from 'faker';
import jwtDecode from 'jwt-decode';
import app from '../app';
import testInit from './testInit';

const request = supertest(app);
const { expect } = chai;
const testVariables = new testInit();

describe('Test user API', () => {
    let adminId;
    let userId;
    let adminToken;

    describe('creating a new admin or user', () => {
        let firstName = testVariables.firstName;
        let lastName = testVariables.lastName;
        let adminFirstName = testVariables.adminFirstName;
        let adminLastName = testVariables.adminLastName;

        it('should return a status 400 error response for an empty firstName field', (done) => {
            request.post('/api/v1/auth/signup')
                .send({
                    firstName: '',
                    lastName,
                    email: testVariables.demoUserEmail,
                    password: testVariables.demoUserPassword,
                    department: testVariables.demoUserDepartment,
                    role: 'role',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });

        it('should return a status 400 error response for an empty firstName field with only spaces', (done) => {
            request.post('/api/v1/auth/signup')
                .send({
                    firstName: '            ',
                    lastName,
                    email: testVariables.demoUserEmail,
                    password: testVariables.demoUserPassword,
                    department: testVariables.demoUserDepartment,
                    role: 'role'

                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });

        it('should return a status 400 error response for an empty lastName field', (done) => {
            request.post('/api/v1/auth/signup')
                .send({
                    firstName,
                    lastName: '',
                    email: testVariables.demoUserEmail,
                    password: testVariables.demoUserPassword,
                    department: testVariables.demoUserDepartment,
                    role: 'role'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });
        it('should return a status 400 error response for a empty lastName field with only spaces', (done) => {
            request.post('/api/v1/auth/signup')
                .send({
                    firstName,
                    lastName: '             ',
                    email: testVariables.demoUserEmail,
                    password: testVariables.demoUserPassword,
                    department: testVariables.demoUserDepartment,
                    role: 'role'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });

        it('should return a status 400 error response for an empty email field', (done) => {
            request.post('/api/v1/auth/signup')
                .send({
                    firstName,
                    lastName,
                    email: '',
                    password: testVariables.demoUserPassword,
                    department: testVariables.demoUserDepartment,
                    role: 'role'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });

        it('should return a status 400 error response for a empty email field with only spaces', (done) => {
            request.post('/api/v1/auth/signup')
                .send({
                    firstName,
                    lastName,
                    email: '            ',
                    password: testVariables.demoUserPassword,
                    department: testVariables.demoUserDepartment,
                    role: 'role'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });

        it('should return a status 400 error response for invalid email', (done) => {
            request.post('/api/v1/auth/signup')
                .send({
                    firstName,
                    lastName,
                    email: '',
                    password: testVariables.demoUserPassword,
                    department: testVariables.demoUserDepartment,
                    role: 'role'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });

        it('should return a status 400 error response for empty password field', (done) => {
            request.post('/api/v1/auth/signup')
                .send({
                    firstName,
                    lastName,
                    email: testVariables.demoUserEmail,
                    password: '',
                    department: testVariables.demoUserDepartment,
                    role: 'role'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });

        it('should return a status 400 error response for password field with only spaces', (done) => {
            request.post('/api/v1/auth/signup')
                .send({
                    firstName,
                    lastName,
                    email: testVariables.demoUserEmail,
                    password: '          ',
                    department: testVariables.demoUserDepartment,
                    role: 'role'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });

        it('should return 200 response for creating a user ', (done) => {
            request.post('/api/v1/auth/signup')
                .set('Content-type', 'application/json')
                .send({
                    firstName: 'fayo',
                    lastName: 'girt',
                    email: 'first@gmail.com',
                    password: 'password',
                    role: 'role',
                    department: 'department',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal(`Account Created for fayo girt`);
                    done();
                });
        });
    });


    describe('Test to sign a user and/or admin in/out', () => {
        it('should return a status 400 error response if email is empty', (done) => {
            request
                .post('/api/v1/auth/login')
                .set('Content-type', 'application/json')
                .send({
                    email: '',
                    password: testVariables.demoUserPassword,
                    requests: testVariables.demoUserRequests
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });

        it('should return a status 400 error response if email field with only spaces', (done) => {
            request.post('/api/v1/auth/login')
                .send({
                    email: '          ',
                    password: testVariables.demoUserPassword,
                    requests: testVariables.demoUserRequests
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });

        it('should return a status 400 error response for empty password field', (done) => {
            request.post('/api/v1/auth/login')
                .send({
                    email: testVariables.adminEmail,
                    password: '',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });

        it('should return a status 400 error response for password field with only spaces', (done) => {
            request.post('/api/v1/auth/login')
                .send({
                    email: testVariables.adminEmail,
                    password: '         ',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                    done();
                });
        });

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
                    process.env.TOKEN = res.body.token;
                    userId = jwtDecode(process.env.TOKEN).id;
                });
            done();
        });
    });
});