const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const mailerRouter = require('./routes/mailer');
const projectRouter = require('./routes/projects');
const corsOptions = require('./config/cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

app.use(cors(corsOptions));

app.use('', mailerRouter);
app.use('', projectRouter);

/**
 * Handling inexsitent routes. Default response for any other request
 */
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Opsss! The url: ' + req.url + ' of type: ' + req.method + ' does not exist',
  });
});

module.exports = app;
