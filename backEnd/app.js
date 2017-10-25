import express from 'express';
const app = express();


app.all('/', (req, res, next) => {
  res.status(200).send();
  next();
});


module.exports = app;
