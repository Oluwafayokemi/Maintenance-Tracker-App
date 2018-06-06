/* global describe, it */
import chai from 'chai';
import { beforeEach } from 'mocha';
import supertest from 'supertest';
import auth from '../middleware/auth';
import app from '../app';

const request = supertest(app);
const { expect } = chai;
const user = {
  id: 1,
  firstname: 'fayokemi',
  lastname: 'adeyina',
  isadmin: true,
  email: 'fayoaright@gmail.com',
  password: '$2a$10$xyYyMLbzC55twFiAlPiaaOUtLl19iHFngx1.fK55Uc0QGLW5NTXF6',
  department: 'Water Management',
  joined: '2018-05-29T23:00:00.000Z',
};
let decodedToken;
describe('Get request for an admin', () => {
  describe('login user', () => {
    beforeEach((done) => {
      decodedToken = auth.token(user);
      done();
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
    describe('/GET /api/v1/requests/:id', () => {
      it('should return 200 response for getting all users requests', (done) => {
        request
          .get('/api/v1/requests/1')
          .set('x-access-token', decodedToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.haveOwnProperty('message').to.equal('all requests retrieved successfully');
            // expect(res.body.equipment).to.equal('generator');
            // expect(res.body.description).to.equal('Generator goes off always');
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

      it('should return 200 response for disapproved update', (done) => {
        request
          .put('/api/v1/requests/1/disapprove')
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
          .put('/api/v1/requests/2/resolve')
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
