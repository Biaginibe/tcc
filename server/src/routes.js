const express = require('express');
const UserController = require('./controller/UserController');
const PatienteController = require('./controller/PatienteController');
const PsychologistController = require('./controller/PsychologistController');
const ScheduleController = require('./controller/ScheduleController');
const ClientController = require('./controller/ClientController');
const AuthController = require('./controller/AuthController');


const routes = express.Router();

//AUTENTICAÇÃO
routes.post('/login', AuthController.signIn);

//==================================== S P R I N T  1 ===================================

//insere usuario
routes.post('/admin/createUser', UserController.createUser);

//ativa e desativa o usuario (precisa passar o id)
routes.put(
	'/admin/:id_user/disable_enableUser',
	UserController.disable_enableUser
);

//deleta o usuario (precisa passar o id)
routes.delete('/admin/:id_user/deleteUser', UserController.deleteUser);

//lista todos os usuarios
routes.get('/admin/findUsers', UserController.findAllUsers);

//lista todos os pacientes
routes.get('/admin/findPatientes', PatienteController.findAllPatientes);

//ativa e desativa o paciente (precisa passar o id)
routes.put(
	'/admin/:id_user/disable_enablePatiente',
	PatienteController.disable_enableUser
);

//deleta o paciente (precisa passar o id)
routes.delete(
	'/admin/:id_user/deletePatiente',
	PatienteController.deletePatiente
);

//lista todos os psicologos
routes.get(
	'/admin/findPsychologist',
	PsychologistController.findAllPsycologists
);

//ativa e psicologo o paciente (precisa passar o id)
routes.put(
	'/admin/:id_user/disable_enablePsychologist',
	PsychologistController.disable_enablePsychologist
);

//deleta o psicologo (precisa passar o id)
routes.delete(
	'/admin/:id_user/deletePsychologist',
	PsychologistController.deletePsychologist
);

//================================== S P R I N T 2 ===========================================
//AGENDA!!
routes.post(
	'/psychologist/:id_psicologo/createSchedule',
	ScheduleController.createSchedule
);

routes.get(
	'/psychologist/:id_psicologo/findSchedule',
	ScheduleController.findScheduleByPsychologist
);
routes.get(
	'/psychologist/:id_psicologo/findOneSchedule',
	ScheduleController.findDataOfOneSchedule
);

routes.get(
	'/psychologist/findAllSchedulers',
	ScheduleController.findAllSchedules
);

routes.put(
	'/psychologist/:id_psicologo/:id_schedule/disable_enableSchedule',
	ScheduleController.enable_disableSchedule
);

routes.put(
	'/psychologist/:id_psicologo/:id_schedule/updateSchedule',
	ScheduleController.updateSchedule
);

routes.delete(
	'/psychologist/:id_psicologo/:id_schedule/deleteSchedule',
	ScheduleController.deleteSchedule
);

//LOCALIZAÇÃO!!
routes.get('/', ClientController.findAllPsychologistClients);

routes.get('/filter', ClientController.findAllPsychologistClientsFilter);

//LISTAR!!
routes.get('/listar', ClientController.findPsychologistProfileWithUserName)

//================================ E X T R A ===============================================

routes.post('/Psychologist/:id_user/client', ClientController.createClient);

routes.post(
	'/Psychologist/:id_cliente/incrementPerfilPsychologist',
	PsychologistController.createPerfilPsychologist
);

routes.get(
	'/Psychologist/findAllPerfilPsychologist',
	PsychologistController.findAllPerfil
);

routes.post('');
module.exports = routes;
