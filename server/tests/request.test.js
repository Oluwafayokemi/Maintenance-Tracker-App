/* global describe, it */

import chai from 'chai';
import jwtDecode from 'jwt-decode';
import supertest from 'supertest';
import app from '../app';
import testInit from './testInit';

const request = supertest(app);
const { expect } = chai;
const testVariables = new testInit();

describe('Creating a new request', () => {
    let decodedToken;
    let token;
    let requestId;

    describe('/GET /api/v1/requests', () => {
        it('should return 200 response for getting all users requests', (done) => {
            request.get('/api/v1/requests')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.haveOwnProperty('message').to.equal('all requests retrieved successfully');
                    done();
                });

        });
        // it("should return 200 response for getting search result for users request with filters by UserId", done => {
        //     request
        //         .get(`${testConstants.requestsApiRoute}?filter=name&search=`)
        //         .end((err, res) => {
        //             let requestCount = res.body.requests.length;
        //             expect(res.status).to.equal(200);
        //             expect(res.body).to.be.an("object");
        //             expect(res.body)
        //                 .to.haveOwnProperty("meta")
        //                 .to.be.an("object");
        //         });
        //     done();
        // });
    });
    // describe('/PUT /api/v1/requests/:id', () => {
    //     it('should return 404 for trying to edit/modify a request with an id parameter, but no token', (done) => {
    //         request.put('/api/v1/requests/${requestId}')
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(404);
    //                 expect(res.body).to.be.an('object');
    //                 expect(res.body).to.haveOwnProperty('message').to.equal('unatuhrorized user, You need to sign in');
    //                 done();
    //             });
    //     });
    //     it('should return 200 for finally updating a request', (done) => {
    //         request
    //             .put('/api/v1/requests/600')
    //             .set('x-access-token', token)
    //             .send({
    //                 userId: testVariables.demoRequestUserId,
    //                 option: testVariables.demoRequestsOption,
    //                 description: testVariables.demoRequestDescrp,
    //                 status: testVariables.demoRequestStatus
    //             })
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(200);
    //                 expect(res.body).to.be.an('object');
    //                 expect(res.body).to.haveOwnProperty('message').to.equal('request updated successfully');
    //                 done();
    //             });
    //     });

    //     it('should return 404 for trying to update a request with incorrect id', (done) => {
    //         request
    //             .put('/api/v1/requests/invalid')
    //             .set('x-access-token', token)
    //             .send({
    //                 userId: testVariables.demoRequestUserId,
    //                 option: testVariables.demoRequestsOption,
    //                 description: testVariables.demoRequestDescrp,
    //                 status: testVariables.demoRequestStatus
    //             })
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(404);
    //                 expect(res.body).to.be.an('object');
    //                 expect(res.body).to.haveOwnProperty('message').to.equal('request not found');
    //                 done();
    //             });
    //     });
    //     it('should return 404 for trying to update a request with incorrect userId', (done) => {
    //         request
    //             .put('/api/v1/requests/invalid')
    //             .set('x-access-token', token)
    //             .send({
    //                 userId: 'testVariables.demoRequestUserId',
    //                 option: testVariables.demoRequestsOption,
    //                 description: testVariables.demoRequestDescrp,
    //                 status: testVariables.demoRequestStatus
    //             })
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(404);
    //                 expect(res.body).to.be.an('object');
    //                 expect(res.body).to.haveOwnProperty('message').to.equal('invalid user');
    //                 done();
    //             });
    //     });
    //     it("should return 200 response for finally updating a request", () => {
    //         request
    //             .put(`${testVariables.requestsApiRoute}/${requestId}`)
    //             .set("x-access-token", token)
    //             .send({
    //                 userId: 'testVariables.demoRequestUserId',
    //                 option: testVariables.demoRequestsOption,
    //                 description: testVariables.demoRequestDescrp,
    //                 status: testVariables.demoRequestStatus
    //             })
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(400);
    //                 expect(res.body).to.be.an("object");
    //                 expect(res.body)
    //                     .to.haveOwnProperty("message")
    //                     .to.equal("a required field is missing");
    //                 done();
    //             });
    //     });
    // });
});