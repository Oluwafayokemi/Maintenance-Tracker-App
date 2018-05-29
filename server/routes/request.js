import express from 'express';
import Request from '../controllers/request';
import authenticate from '../middleware/authenticate';
import roleAuth from '../middleware/roleAuth';

const router = express.Router();

router.get('/api/v1/requests', authenticate, roleAuth, Request.getAll)
  .put('/api/v1/requests/:id/approve', authenticate, roleAuth, Request.approve)
  .put('/api/v1/requests/:id/dissaprove', authenticate, roleAuth, Request.dissaprove)
  .put('/api/v1/requests/:id/resolve', authenticate, roleAuth, Request.resolve);

module.exports = router;
