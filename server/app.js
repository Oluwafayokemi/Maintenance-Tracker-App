import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';
import userRouter from './routes/userAccount';
import adminRequestRouter from './routes/adminRequest';
import userRequestRouter from './routes/userRequest';

const app = express();
app.use(compression());
app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));

app.use(userRouter);
app.use(adminRequestRouter);
app.use(userRequestRouter);

app.get('*', (req, res) => {
  res.status(200).json('Welcome To maintenance Tracker App, Built by Fayokemi Adeyina');
});

app.use((req, res, next) => {
  const err = res.status(404).send({
    error: '404: Sorry Page Not Found!',
  });
  next(err);
});

const port = parseInt(process.env.PORT, 10) || 4000;
app.set('port', port);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

export default app;
