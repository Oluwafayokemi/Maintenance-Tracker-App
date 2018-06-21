import express from 'express';
import authenticate from '../middleware/authenticate';
import userRequest from '../controllers/userRequest';
import Validator from '../middleware/validator';

const router = express.Router();
const validate = new Validator();

router.get('/api/v1/users/requests', authenticate, validate.validateFilter, userRequest.getAll)
  .get('/api/v1/users/requests/:id', authenticate, userRequest.getOne)
  .post('/api/v1/users/requests', validate.validateRequest, authenticate, userRequest.create)
  .put('/api/v1/users/requests/:id', validate.validateRequest, authenticate, userRequest.update);

export default router;
