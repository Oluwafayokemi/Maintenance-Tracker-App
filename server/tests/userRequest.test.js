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

      describe('/POST /api/v1/users/requests', () => {
        it('should return 401 response for no token', (done) => {
          request
            .post('/api/v1/users/requests')
            .set('x-access-token', 'busywuh2uy32hewy32.979ir7493ri4fii')
            .send({
              equipment: 'saiolr',
              description: 'password',
            })
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body)
                .to.haveOwnProperty('message')
                .to.equal('Invalid token');
              done();
            });
        });

        it('should return 400 response for an empty equipment field', (done) => {
          request
            .post('/api/v1/users/requests')
            .set('x-access-token', defaultToken)
            .send({
              equipment: '',
              description: 'password',
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid Input');
              done();
            });
        });

        it('should return 400 response for an empty description field', (done) => {
          request
            .post('/api/v1/users/requests')
            .set('x-access-token', defaultToken)
            .send({
              equipment: 'equipment',
              description: '',
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid Input');
              done();
            });
        });

        it('should return 400 response if equipment is not a string', (done) => {
          request
            .post('/api/v1/users/requests')
            .set('x-access-token', defaultToken)
            .send({
              equipment: 8,
              description: 'describe',
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid Input');
              done();
            });
        });

        it('should return 400 response if description is not a string', (done) => {
          request
            .post('/api/v1/users/requests')
            .set('x-access-token', defaultToken)
            .send({
              equipment: 'describe',
              description: 7,
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid Input');
              done();
            });
        });
        it('should return 201 response for creating a request', (done) => {
          request
            .post('/api/v1/users/requests')
            .set('x-access-token', defaultToken)
            .send({
              equipment: 'equipment',
              description: 'desccription',
            })
            .end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Request created successfully');
              done();
            });
        });
      });

      describe('/GET /api/v1/users/requests/', () => {
        it('should return 401 for trying to get a request with an invalid token', (done) => {
          request
            .get('/api/v1/users/requests')
            .set('x-access-token', 'busywuh2uy32hewy32.979ir7493ri4fii')
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
              done();
            });
        });

        it('should return 200 response for getting all requests for the user', (done) => {
          request
            .get('/api/v1/users/requests')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('true');
              expect(res.body).to.haveOwnProperty('message').to.equal('all requests retrieved successfully');
              expect(res.body).to.haveOwnProperty('requests').to.be.an('array');
              expect(res.body.requests[0]).to.haveOwnProperty('userid').to.be.equal(1);
              expect(res.body.requests[0]).to.haveOwnProperty('equipment').to.be.equal('generator');
              expect(res.body.requests[0]).to.haveOwnProperty('description').to.be.equal('Generator goes off always');
              expect(res.body.requests[1]).to.haveOwnProperty('userid').to.be.equal(1);
              expect(res.body.requests[1]).to.haveOwnProperty('equipment').to.be.equal('generator');
              expect(res.body.requests[1]).to.haveOwnProperty('description').to.be.equal('Generator goes off always');
              done();
            });
        });
      });

      describe('/GET /api/v1/users/requests/:id', () => {
        it('should return 401 for trying to get a request with an invalid token', (done) => {
          request
            .get('/api/v1/users/requests/1')
            .set('x-access-token', 'busywuh2uy32hewy32.979ir7493ri4fii')
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
              done();
            });
        });

        it('should return 404 for trying to get a request with and id that does not exist', (done) => {
          request
            .get('/api/v1/users/requests/200')
            .set('x-access-token', defaultToken)
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
            .get('/api/v1/users/requests/sdkjslkdjlfk')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid Request Id');
              expect(res.body).to.haveOwnProperty('success').to.equal('false');
              done();
            });
        });

        it('should return 200 response for getting a users requests', (done) => {
          request
            .get('/api/v1/users/requests/1')
            .set('x-access-token', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('all requests retrieved successfully');
              expect(res.body.request).to.haveOwnProperty('userid').to.be.equal(1);
              expect(res.body.request).to.haveOwnProperty('equipment').to.be.equal('generator');
              expect(res.body.request).to.haveOwnProperty('description').to.be.equal('Generator goes off always');
              done();
            });
        });
      });

      describe('/PUT /api/v1/users/requests/:id', () => {
        it('should return 401 for trying to edit/modify a request with an id parameter, but no token', (done) => {
          request
            .put('/api/v1/users/requests/1')
            .send({
              equipment: 'equipment',
              description: 'desccription',
            })
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
              done();
            });
        });

        it('should return 400 for trying to edit/modify a request with an empty equipment field', (done) => {
          request
            .put('/api/v1/users/requests/1')
            .send({
              equipment: '',
              description: 'desccription',
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid Input');
              done();
            });
        });

        it('should return 400 for trying to edit/modify a request with an description field', (done) => {
          request
            .put('/api/v1/users/requests/1')
            .send({
              equipment: 'equipment',
              description: '',
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal('Invalid Input');
              done();
            });
        });

        it('should return 404 response for invalid id', (done) => {
          request
            .put('/api/v1/users/requests/200')
            .set('x-access-token', defaultToken)
            .send({
              equipment: 'equipment',
              description: 'description',
            })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body).to.be.an('object');
              expect(res.body)
                .to.haveOwnProperty('message')
                .to.equal('Request does not exist');
              done();
            });
        });

        it('should return 403 response for trying to modify a request that has already been acted upon by the admin', (done) => {
          request
            .put('/api/v1/users/requests/3')
            .set('x-access-token', defaultToken)
            .send({
              equipment: 'equipment',
              description: 'description',
            })
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.be.an('object');
              expect(res.body)
                .to.haveOwnProperty('message')
                .to.equal('Request can no longer be modified because Admin has already acted on the request');
              done();
            });
        });

        it('should return 400 response for trying to modify a request with an invalid id', (done) => {
          request
            .put('/api/v1/users/requests/adsjflkasd;lfkj')
            .set('x-access-token', defaultToken)
            .send({
              equipment: 'equipment',
              description: 'description',
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body)
                .to.haveOwnProperty('message')
                .to.equal('Invalid Request Id');
              done();
            });
        });

        it('should return 201 response for finally updating a request', (done) => {
          request
            .put('/api/v1/users/requests/1')
            .set('x-access-token', adminToken)
            .send({
              equipment: 'equipment',
              description: 'description',
            })
            .end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body).to.haveOwnProperty('message').to.equal(`Request on ${res.body.request.equipment} updated successfully`);
              done();
            });
        });
      });
    });
  });
});
