/* global describe, it */
import chai from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../app';
import Test from './testInit';

dotenv.config();

const request = supertest(app);
const { expect } = chai;
const testVariables = new Test();

describe('Test user API', () => {
  describe('creating a new admin or user', () => {
    const { firstName } = testVariables;
    const { lastName } = testVariables;

    it('should return a status 400 error response for an empty firstName field', (done) => {
      request.post('/api/v1/auth/signup')
        .send({
          firstName: '',
          lastName,
          email: testVariables.demoUserEmail,
          password: testVariables.demoUserPassword,
          department: testVariables.demoUserDepartment,
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
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.haveOwnProperty('message').to.equal('a required field is missing');
          done();
        });
    });

    it('should return 200 response for creating an default user ', (done) => {
      request
        .post('/api/v1/auth/signup')
        .set('Content-type', 'application/json')
        .send({
          firstName,
          lastName,
          email: 'simple@gmail.com',
          password: 'simple',
          department: testVariables.demoUserDepartment,
          isAdmin: true,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.haveOwnProperty('message').to.equal(`Account Created for ${firstName} ${lastName}`);
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
          requests: testVariables.demoUserRequests,
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
          requests: testVariables.demoUserRequests,
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
       
    it('should return a status 400 error response for password field with only spaces', (done) => {
      request.post('/api/v1/auth/login')
        .send({
          email: 'simple@gmail.com',
          password: 'simle',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.haveOwnProperty('message').to.equal('Wrong password');
          done();
        });
    });

    it('should return a status 200 success response for logging in a default user', (done) => {
      request.post('/api/v1/auth/login')
        .send({
          email: 'simple@gmail.com',
          password: 'simple',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('token');
          expect(res.body).to.haveOwnProperty('message').to.equal('Sign in successful');
          done();
        });
    });
  });
});
