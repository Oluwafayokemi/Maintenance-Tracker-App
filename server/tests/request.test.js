/* global describe, it */

import chai from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
const { expect } = chai;

describe('/POST /api/v1/users/requests', () => {
    it('should return 400 response for an empty name field', (done) => {
        request.post('/api/v1/users/requests')
            .send({
                name: '',
                department: 'department',
                description: 'description',
                option: 'option',
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                done();
            });
    });

    it('should return 400 response for an empty department field', (done) => {
        request.post('/api/v1/users/requests')
            .send({
                name: 'name',
                department: ' ',
                description: 'description',
                option: 'option',
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                done();
            });
    });

    it('should return 400 response for an empty description field', (done) => {
        request.post('/api/v1/users/requests')
            .send({
                name: 'name',
                department: 'department',
                description: ' ',
                option: 'option',
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                done();
            });
    });

    it('should return 400 response for an empty option field', (done) => {
        request.post('/api/v1/users/requests')
            .send({
                name: 'name',
                department: 'department',
                description: 'description',
                option: ''
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                done();
            });
    });

    it('should return 400 response if option is not a string', (done) => {
        request.post('/api/v1/users/requests')
            .send({
                name: 'name',
                department: 'department',
                description: 'description',
                option: 3
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                done();
            });
    });

    it('should return 400 response if name is not a string', (done) => {
        request.post('/api/v1/users/requests')
            .send({
                name: 3,
                department: 'department',
                description: 'description',
                option: 'option',
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                done();
            });
    });

    it('should return 400 response if department is not a string', (done) => {
        request.post('/api/v1/users/requests')
            .send({
                name: 'name',
                department: 3,
                description: ' description',
                option: 'option',
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                done();
            });
    });

    it('should return 400 response if description is not a string', (done) => {
        request.post('/api/v1/users/requests')
            .send({
                name: 'name',
                department: 'department',
                description: 3,
                option: 'option',
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
                done();
            });
    });

    it('should create users requests and return 201 response', (done) => {
        request.post('/api/v1/users/requests')
            .send({
                name: 'name',
                department: 'department',
                description: 'description',
                option: 'option'
            })
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('successfully created new request');
                done();
            });
    });
});

describe('/GET /api/v1/users/requests', () => {
    it('should respond with json when getting a users requests', (done) => {
        request
            .get('/api/v1/users/requests')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, done);
    });

    it('should return 201 response for getting all users requests', (done) => {
        request.get('/api/v1/users/requests')
            .send({
                name: 'name',
                department: 'department',
                description: 'description',
                option: 'option'
            })
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('successfully retrieved all requests');
                done();
            });
    });
});

describe('/GET /api/v1/users/requests/:id', () => {
    it('should return 404 response for getting a users requests with wrong id', (done) => {
        request.get('/api/v1/users/requests/10')
            .send({
                name: 'name',
                department: 'department',
                description: 'description',
                option: 'option',
            })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('request not found');
                done();
            });
    });

    it('should return 201 response for getting a users requests', (done) => {
        request.get('/api/v1/users/requests/1')
            .send({
                name: 'name',
                department: 'department',
                description: 'description',
                option: 'option'
            })
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('request sucessfuly retrieved');
                done();
            });
    });
});

describe('/PUT /api/v1/users/requests/3', () => {
    it('should return 200 for finally updating a request', (done) => {
        request.put('/api/v1/users/requests/3')
            .send({
                name: 'chicken source',
                option: 'option',
                description: 'description',
                department: 'department',
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('request updated successfully');
                done();
            });
    });

    it('should return 404 for trying to update a request with incorrect id', (done) => {
        request.put('/api/v1/users/requests/10')
            .send({
                name: 'chicken source',
                option: 'option',
                description: 'description',
                department: 'department',
            })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('request not found');
                done();
            });
    });
});

describe('/DELETE /api/v1/users/requests/3', () => {
    it('should return 202 for finally deleting a request', (done) => {
        request.delete('/api/v1/users/requests/3')
            .send({
                name: 'name',
                option: '',
                description: 'description',
                department: 'department',
            })
            .end((err, res) => {
                expect(res.status).to.equal(202);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('request sucesfully deleted');
                done();
            });
    });

    it('should return 404 for trying to delete a request with wrong id', (done) => {
        request.delete('/api/v1/users/requests/10')
            .send({
                name: 'name',
                option: 'option',
                description: 'description',
                department: 'department',
            })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('message').to.equal('request not found');
                done();
            });
    });
});