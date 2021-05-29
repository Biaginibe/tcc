const express = require('express');
const UserController = require('./controller/UserController')

const routes = express.Router();

routes.post('/createUser', UserController.createUser);

routes.get('/findUsers', UserController.findUsers);

module.exports = routes;
