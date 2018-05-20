import express from 'express';
import Request from '../controllers/request';
import Validator from '../middleware/validator';

const router = express.Router();
const validate = new Validator();

router.get('/api/v1/users/requests', Request.getAll)
.get('/api/v1/users/requests/:id', Request.getOne)
.post('/api/v1/users/requests', validate.validateRequest, Request.create)
.put('/api/v1/users/requests/:id', Request.update)
.delete('/api/v1/users/requests/:id', Request.remove);

module.exports = router;