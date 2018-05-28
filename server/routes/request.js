import express from 'express';
import Request from '../controllers/request';
import Validator from '../middleware/validator';
import authenticate from '../middleware/authenticate';
import roleAuth from '../middleware/roleAuth';

const router = express.Router();
const validate = new Validator();

router.get('/api/v1/requests', authenticate, roleAuth, Request.getAll);

module.exports = router;
