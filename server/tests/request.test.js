/* global describe, it */
import chai from 'chai';
import dotenv from 'dotenv';
import supertest from 'supertest';
import app from '../app';
import Test from './testInit';

dotenv.config();

const request = supertest(app);
const { expect } = chai;
const testVariables = new Test();

let decodedToken;

describe('Get request for an admin', () => {
  describe('sign in a user', () => {
    it('should return a status 200 success response for logging in a default user', (done) => {
      request.post('/api/v1/auth/login')
        .send({
          email: 'fayoaright@gmail.com',
          password: 'tester',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('token');
          expect(res.body).to.haveOwnProperty('message').to.equal('Sign in successful');
          decodedToken = res.body.token;
          done();
        });
    });
  });

  describe('/GET /api/v1/requests', () => {
    it('should return 200 response for getting all users requests', (done) => {
      request
        .get('/api/v1/requests')
        .set('x-access-token', decodedToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.haveOwnProperty('message').to.equal('all requests retrieved successfully');
          done();
        });
    });
  });
});
