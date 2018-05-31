import express from 'express';
import authenticate from '../middleware/authenticate';
import Users from '../controllers/userAccount';
import Validator from '../middleware/validator';
import userUpdate from '../middleware/userStatus';
import getToken from '../middleware/signupToken';

const router = express.Router();
const validate = new Validator();

router.post('/api/v1/auth/signup', validate.validateRegister, Users.create, getToken)
  .post('/api/v1/auth/login', validate.validateLogin, Users.login)
  .get('/api/v1/users/requests', authenticate, Users.getAllRequest)
  .get('/api/v1/users/requests/:id', authenticate, Users.getOneRequest)
  .post('/api/v1/users/requests', validate.validateRequest, authenticate, Users.createRequest)
  .put('/api/v1/users/requests/:id', validate.validateRequest, authenticate, userUpdate, Users.updateRequest);

module.exports = router;
