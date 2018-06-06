import express from 'express';
import Request from '../controllers/request';
import authenticate from '../middleware/authenticate';
import roleAuth from '../middleware/roleAuth';
import isRequest from '../middleware/isRequest';

const router = express.Router();

router.get('/api/v1/requests', authenticate, roleAuth, Request.getAll)
  .get('/api/v1/requests/:id', authenticate, roleAuth, Request.getOne)
  .put('/api/v1/requests/:id/approve', authenticate, roleAuth, isRequest.isResolved, Request.approve)
  .put('/api/v1/requests/:id/disapprove', authenticate, roleAuth, isRequest.isResolved, Request.disapprove)
  .put('/api/v1/requests/:id/resolve', authenticate, roleAuth, isRequest.resolveCheck, Request.resolve);

export default router;
