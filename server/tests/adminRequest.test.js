/* global describe, it */
import chai from 'chai';
import { beforeEach } from 'mocha';
import supertest from 'supertest';
import auth from '../middleware/auth';
import app from '../app';

const request = supertest(app);
const { expect } = chai;
const adminUser = {
  userid: 1,
  isadmin: true,
};

const defaultUser = {
  userid: 2,
  isadmin: false,
};

let adminToken;
let defaultToken;

describe('Get request for an admin', () => {
  describe('login user', () => {
    beforeEach((done) => {
      adminToken = auth.token(adminUser);
      done();
    });

    describe('login user', () => {
      beforeEach((done) => {
        defaultToken = auth.token(defaultUser);
        done();
      });

      describe('/GET /api/v1/requests', () => {
        it('should return 401 for trying to get all request with an invalid token', (done) => {
          request
            .get('/api/v1/requests')
            .set('x-access-token', 'busywuh2uy32hewy32.979ir7493ri4fii')
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
              done();
            });
        });
        it('should return 403 for trying to get a request as an unathorized user', (done) => {
          request
            .get('/api/v1/requests')
            .set('x-access-token', defaultToken)
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              expect(res.body).to.haveOwnProperty('message').to.equal('Access Denied, only admin can make this request');
              done();
            });
        });
        it('should return 200 response for getting all users requests', (done) => {
          request
            .get('/api/v1/requests')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('all requests retrieved successfully');
              expect(res.body).to.haveOwnProperty('success').to.equal('true');
              expect(res.body).to.haveOwnProperty('requests').to.be.an('array');
              expect(res.body.requests[0]).to.haveOwnProperty('userid').to.be.equal(1);
              expect(res.body.requests[0]).to.haveOwnProperty('equipment').to.be.equal('generator');
              expect(res.body.requests[0]).to.haveOwnProperty('description').to.be.equal('Generator goes off always');
              expect(res.body.requests[1]).to.haveOwnProperty('userid').to.be.equal(1);
              expect(res.body.requests[1]).to.haveOwnProperty('equipment').to.be.equal('generator');
              expect(res.body.requests[1]).to.haveOwnProperty('description').to.be.equal('Generator goes off always');
              expect(res.body.requests[2]).to.haveOwnProperty('userid').to.be.equal(2);
              expect(res.body.requests[2]).to.haveOwnProperty('equipment').to.be.equal('Air Condition');
              expect(res.body.requests[2]).to.haveOwnProperty('description').to.be.equal('air condition blows hot air');
              done();
            });
        });
      });
      describe('/GET /api/v1/requests/:id', () => {
        it('should return 401 for trying to get a request with an invalid token', (done) => {
          request
            .get('/api/v1/requests/1')
            .set('x-access-token', 'busywuh2uy32hewy32.979ir7493ri4fii')
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
              done();
            });
        });
        it('should return 403 for trying to get a request as an unathorized user', (done) => {
          request
            .get('/api/v1/requests/1')
            .set('x-access-token', defaultToken)
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              expect(res.body).to.haveOwnProperty('message').to.equal('Access Denied, only admin can make this request');
              done();
            });
        });

        it('should return 200 response for getting all users requests', (done) => {
          request
            .get('/api/v1/requests/1')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('all requests retrieved successfully');
              expect(res.body).to.haveOwnProperty('success').to.equal('true');
              expect(res.body.request).to.haveOwnProperty('userid').to.be.equal(1);
              expect(res.body.request).to.haveOwnProperty('equipment').to.be.equal('generator');
              expect(res.body.request).to.haveOwnProperty('description').to.be.equal('Generator goes off always');
              done();
            });
        });

        it('should return 404 response for trying to get a request that does not exist', (done) => {
          request
            .get('/api/v1/requests/100')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Request does not exist');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              done();
            });
        });

        it('should return 400 response for trying to get a request with an invalid id', (done) => {
          request
            .get('/api/v1/requests/sdkjslkdjlfk')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid Request');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              done();
            });
        });
      });

      describe('/PUT /api/v1/requests', () => {
        it('should return 401 for trying to approve a request with an invalid token', (done) => {
          request
            .put('/api/v1/requests/1/approve')
            .set('x-access-token', 'busywuh2uy32hewy32.979ir7493ri4fii')
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
              done();
            });
        });
        it('should return 403 for trying to approve a request as an unathorized user', (done) => {
          request
            .put('/api/v1/requests/1/approve')
            .set('x-access-token', defaultToken)
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              expect(res.body).to.haveOwnProperty('message').to.equal('Access Denied, only admin can make this request');
              done();
            });
        });
        it('should return 403 for trying to disapprove a request as an unathorized user', (done) => {
          request
            .put('/api/v1/requests/1/disapprove')
            .set('x-access-token', defaultToken)
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              expect(res.body).to.haveOwnProperty('message').to.equal('Access Denied, only admin can make this request');
              done();
            });
        });
        it('should return 403 for trying to approve a request as an unathorized user', (done) => {
          request
            .put('/api/v1/requests/1/resolve')
            .set('x-access-token', defaultToken)
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              expect(res.body).to.haveOwnProperty('message').to.equal('Access Denied, only admin can make this request');
              done();
            });
        });
        it('should return 401 for trying to disapprove a request with an invalid token', (done) => {
          request
            .put('/api/v1/requests/1/disapprove')
            .set('x-access-token', 'busywuh2uy32hewy32.979ir7493ri4fii')
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
              done();
            });
        });
        it('should return 401 for trying to resolve a request with an invalid token', (done) => {
          request
            .put('/api/v1/requests/1/resolve')
            .set('x-access-token', 'busywuh2uy32hewy32.979ir7493ri4fii')
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
              done();
            });
        });

        it('should return 404 response for trying to approve a request that does not exist', (done) => {
          request
            .put('/api/v1/requests/200/approve')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Request does not exist');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              done();
            });
        });

        it('should return 400 response for trying to resolve a request with an invalid id', (done) => {
          request
            .put('/api/v1/requests/sdkjslkdjlfk/resolve')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid Request');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              done();
            });
        });

        it('should return 200 response for successfully approving a request', (done) => {
          request
            .put('/api/v1/requests/2/approve')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Request has been approved');
              expect(res.body).to.haveOwnProperty('success').to.equal('true');
              done();
            });
        });

        it('should return 404 response for trying to disapprove a request that does not exist', (done) => {
          request
            .put('/api/v1/requests/200/disapprove')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Request does not exist');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              done();
            });
        });

        it('should return 201 response for successfully dissaproving a request', (done) => {
          request
            .put('/api/v1/requests/2/disapprove')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Request has been dissapproved');
              expect(res.body).to.haveOwnProperty('success').to.equal('true');
              done();
            });
        });

        it('should return 403 response for tryng to resolve a disapproved request', (done) => {
          request
            .put('/api/v1/requests/2/resolve')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Only approved request can be resolved');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              done();
            });
        });

        it('should return 404 response for trying to resolve a request that does not exist', (done) => {
          request
            .put('/api/v1/requests/200/resolve')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Request does not exist');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              done();
            });
        });

        it('should return 403 response for trying to resolve a pending request', (done) => {
          request
            .put('/api/v1/requests/1/resolve')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Only approved request can be resolved');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              done();
            });
        });

        it('should return 200 response for sucessfully resolving a request', (done) => {
          request
            .put('/api/v1/requests/3/resolve')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Request has been resolved');
              expect(res.body).to.haveOwnProperty('success').to.equal('true');
              done();
            });
        });
      });
    });
  });
});
