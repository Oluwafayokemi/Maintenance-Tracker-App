import express from 'express';
import Users from '../controllers/user';
import Validation from '../middleware/Validator';
// import authenticate from '../middleware/authenticate';

const router = express.Router();
const validate = new Validation();

// router.post('/api/v1/auth/login', validate.validateLogin, Users.login)
router.post('/api/v1/auth/signup', validate.validateRegister, Users.create);
// .get('/api/v1/currUser', Users.current)
// .get('/api/v1/users',  Users.getAll)
// .delete('api/v1/users/delete', Users.remove);

export default router;

