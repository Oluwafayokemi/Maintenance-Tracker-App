import express from 'express';
import Request from '../controllers/request';
import Validator from '../middleware/validator';

const router = express.Router();
const validate = new Validator();

router.get('/api/v1/requests', Request.getAll);

module.exports = router;