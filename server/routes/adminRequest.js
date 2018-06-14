import express from 'express';
import adminRequest from '../controllers/adminRequest';
import authenticate from '../middleware/authenticate';
import roleAuth from '../middleware/roleAuth';
import isRequest from '../middleware/isRequest';

const router = express.Router();

router.get('/api/v1/requests', authenticate, roleAuth, adminRequest.getAll)
  .get('/api/v1/requests/:id', authenticate, roleAuth, adminRequest.getOne)
  .put('/api/v1/requests/:id/approve', authenticate, roleAuth, isRequest.isResolved, adminRequest.approve)
  .put('/api/v1/requests/:id/disapprove', authenticate, roleAuth, isRequest.isResolved, adminRequest.disapprove)
  .put('/api/v1/requests/:id/resolve', authenticate, roleAuth, isRequest.resolveCheck, adminRequest.resolve);

export default router;
