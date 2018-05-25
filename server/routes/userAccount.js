import express from 'express';
import Users from '../controllers/userAccount';
import Validator from '../middleware/validator';
import authenticate from '../middleware/authenticate';
import roleAuth from '../middleware/roleAuth';

const router = express.Router();
const validate = new Validator();

router.post('/api/v1/auth/signup', validate.validateRegister, Users.create)
.post('/api/v1/auth/login', validate.validateLogin, Users.login)
.get('/api/v1/users/requests', authenticate, Users.getAllRequest);

module.exports = router;
