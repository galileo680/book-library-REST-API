const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

sequelize
  //.sync({ force: true })
  .sync()
  .then((result) => {
    console.log('Connected to database');
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
