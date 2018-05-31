import express from 'express';
import Request from '../controllers/request';
import authenticate from '../middleware/authenticate';
import roleAuth from '../middleware/roleAuth';
import isRequest from '../middleware/isRequest';

const router = express.Router();

router.get('/api/v1/requests', authenticate, roleAuth, Request.getAll)
  .put('/api/v1/requests/:id/approve', authenticate, roleAuth, isRequest, Request.approve)
  .put('/api/v1/requests/:id/disapprove', authenticate, roleAuth, isRequest, Request.disapprove)
  .put('/api/v1/requests/:id/resolve', authenticate, roleAuth, isRequest, Request.resolve);

module.exports = router;
