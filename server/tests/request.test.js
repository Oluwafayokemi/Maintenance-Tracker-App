/* global describe, it */
import chai from 'chai';
import { before } from 'mocha';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
const { expect } = chai;

let decodedToken;

describe('Get request for an admin', () => {
  describe('sign in a user', () => {
    before((done) => {
      request
        .post('/api/v1/auth/login')
        .send({
          email: 'fayoaright@gmail.com',
          password: 'tester',
        })
        .end((err, res) => {
          // expect(res.body).to.be.an('object');
          // expect(res.status).to.equal(200);
          // expect(res.body).to.haveOwnProperty('token');
          // expect(res.body).to.haveOwnProperty('message').to.equal('Sign in successful');
          decodedToken = res.body.token;
          done();
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

    describe('/PUT /api/v1/requests', () => {
      it('should return 200 response for approved update', (done) => {
        request
          .put('/api/v1/requests/1/approve')
          .set('x-access-token', decodedToken)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.haveOwnProperty('message').to.equal('Request has been approved');
            done();
          });
      });

      it('should return 200 response for dissaproved update', (done) => {
        request
          .put('/api/v1/requests/1/dissaprove')
          .set('x-access-token', decodedToken)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.haveOwnProperty('message').to.equal('Request has been dissapproved');
            done();
          });
      });

      it('should return 200 response for resolved update', (done) => {
        request
          .put('/api/v1/requests/1/resolve')
          .set('x-access-token', decodedToken)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.haveOwnProperty('message').to.equal('Request has been resolved');
            done();
          });
      });
    });
  });
});
