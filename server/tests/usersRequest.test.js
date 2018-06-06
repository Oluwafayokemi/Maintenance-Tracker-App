/* global describe, it */
import chai from 'chai';
import supertest from 'supertest';
import { beforeEach } from 'mocha';
import auth from '../middleware/auth';
import app from '../app';
import Test from './testInit';

const request = supertest(app);
const { expect } = chai;
const testVariables = new Test();
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

describe('User request endpoints', () => {
  describe('login user', () => {
    beforeEach((done) => {
      decodedToken = auth.token(user);
      done();
    });

    describe('/POST /api/v1/users/requests', () => {
      it('should return 401 response for no token', (done) => {
        request
          .post('/api/v1/users/requests')
          .set('x-access-token', 'busywuh2uy32hewy32.979ir7493ri4fii')
          .send({
            option: 'saiolr',
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

      it('should return 400 response for an empty option field', (done) => {
        request
          .post('/api/v1/users/requests')
          .send({
            option: '',
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
          .send({
            option: 'option',
            description: '',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.haveOwnProperty('message').to.equal('Invalid Input');
            done();
          });
      });

      it('should return 400 response if option is not a string', (done) => {
        request
          .post('/api/v1/users/requests')
          .send({
            option: 8,
            description: testVariables.demoRequestDescrp,
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
          .send({
            email: testVariables.demoUserEmail,
            option: testVariables.demoRequestsOption,
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
          .set('x-access-token', decodedToken)
          .send({
            option: 'option',
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
      it('should return 401 for trying to get a request with an id parameter, but no token', (done) => {
        request
          .get('/api/v1/users/requests')
          .set('x-access-token', 'busywuh2uy32hewy32.979ir7493ri4fii')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
            done();
          });
      });

      it('should return 200 response for getting all requests for the user', (done) => {
        request
          .get('/api/v1/users/requests')
          .set('x-access-token', decodedToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.haveOwnProperty('message').to.equal('all requests retrieved successfully');
            done();
          });
      });

      it('should return 200 response for getting a users requests', (done) => {
        request
          .get('/api/v1/users/requests/2')
          .set('x-access-token', decodedToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.haveOwnProperty('message').to.equal('Request retrieved successfully');
            done();
          });
      });
    });

    describe('/PUT /api/v1/users/requests/:id', () => {
      it('should return 401 for trying to edit/modify a request with an id parameter, but no token', (done) => {
        request
          .put('/api/v1/users/requests/3')
          .send({
            option: 'option',
            description: 'desccription',
          })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.haveOwnProperty('message').to.equal('Invalid token');
            done();
          });
      });

      it('should return 400 response for invalid id', (done) => {
        request
          .put('/api/v1/users/requests/200')
          .set('x-access-token', decodedToken)
          .send({
            option: 'option',
            description: 'description',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body)
              .to.haveOwnProperty('message')
              .to.equal('Invalid Input');
            done();
          });
      });

      it('should return 201 response for finally updating a request', (done) => {
        request
          .put('/api/v1/users/requests/3')
          .set('x-access-token', decodedToken)
          .send({
            option: 'option',
            description: 'description',
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.haveOwnProperty('message').to.equal('all requests retrieved successfully');
            done();
          });
      });
    });
  });
});
