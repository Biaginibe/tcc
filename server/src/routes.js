const express = require('express');
const UserController = require('./controller/UserController');
const PatienteController = require('./controller/PatienteController');
const PsychologistController = require('./controller/PsychologistController');
const ScheduleController = require('./controller/ScheduleController');

const routes = express.Router();

//insere usuario
routes.post('/createUser', UserController.createUser);

//ativa e desativa o usuario (precisa passar o id)
routes.put('/disable_enableUser', UserController.disable_enableUser);

//deleta o usuario (precisa passar o id)
routes.delete('/deleteUser', UserController.deleteUser);

//lista todos os usuarios
routes.get('/findUsers', UserController.findAllUsers);

//lista todos os pacientes
routes.get('/findPatientes', PatienteController.findAllPatientes);

//ativa e desativa o paciente (precisa passar o id)
routes.put('/disable_enablePatiente', PatienteController.disable_enableUser);

//deleta o paciente (precisa passar o id)
routes.delete('/deletePatiente', PatienteController.deletePatiente);

//lista todos os psicologos
routes.get('/findPsychologist', PsychologistController.findAllPsycologists);

//ativa e psicologo o paciente (precisa passar o id)
routes.put('/disable_enablePsychologist', PsychologistController.disable_enablePsychologist);

//deleta o psicologo (precisa passar o id)
routes.delete('/deletePsychologist', PsychologistController.deletePsychologist);

//================================== S P R I N T 2 ===========================================

routes.post('/psychologist/:psychologist_id/schedule', ScheduleController.createScheduler)


module.exports = routes;
