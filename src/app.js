const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors())

/**
 * Create Keycloak Middleware
 */
const keycloak = require('./config/keycloak-config.js').initKeycloak();
app.use(keycloak.middleware());

const fileRouter = require('./routes/v1/file');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/v1/file', fileRouter);

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendStatus(500);
})

module.exports = app;
