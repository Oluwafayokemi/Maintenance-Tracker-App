import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import db from './db/index';
import requestRouter from './routes/request';
import userRouter from './routes/userAccount';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRouter);

app.get('*', (req, res) => {
  res.status(200).json("Welcome To maintenance Tracker App, Built by Fayokemi Adeyina");

})

app.use((req, res, next) => {
  const err = res.status(404).send({
    error: '404: Sorry Page Not Found!'
  });
  next(err);
});

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

export default app;
