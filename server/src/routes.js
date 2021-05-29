const express = require('express');
const UserController = require('./controller/UserController');
const PatienteController = require('./controller/PatienteController');
const PsychologistController = require('./controller/PsychologistController');

const routes = express.Router();

routes.post('/createUser', UserController.createUser);

routes.put('/disable_enableUser', UserController.disable_enableUser);

routes.delete('/deleteUser', UserController.deleteUser);

routes.get('/findUsers', UserController.findAllUsers);

routes.get('/findPatientes', PatienteController.findAllPatientes);

routes.get('/findPsychologist', PsychologistController.findAllPsycologists);

module.exports = routes;
