const express = require('express');
const authMiddleware = require('./middlewares/auth');
const UserController = require('./controller/UserController');
const PatienteController = require('./controller/PatienteController');
const PsychologistController = require('./controller/PsychologistController');
const ScheduleController = require('./controller/ScheduleController');
const ClientController = require('./controller/ClientController');
const AuthController = require('./controller/AuthController');

const authRoute = express.Router();
const routes = express.Router();
routes.use(authMiddleware);

//AUTENTICAÇÃO
authRoute.post('/login', AuthController.signIn);

authRoute.post('/valid', AuthController.validateToken);

//Registro
authRoute.post('/admin/createUser', AuthController.registerUser);

authRoute.post('/Psychologist/:id_user/client', ClientController.createClient);

authRoute.post(
	'/Psychologist/:id_cliente/incrementPerfilPsychologist',
	PsychologistController.createPerfilPsychologist
);

//TELA ADMIN
routes.put(
	'/admin/:id_user/disable_enableUser',
	UserController.disable_enableUser
);

routes.delete('/admin/:id_user/deleteUser', UserController.deleteUser);

routes.get('/admin/findUsers', UserController.findAllUsers);

//pag pacientes
routes.get('/admin/findPatientes', PatienteController.findAllPatientes);

routes.put(
	'/admin/:id_user/disable_enablePatiente',
	PatienteController.disable_enableUser
);

routes.delete(
	'/admin/:id_user/deletePatiente',
	PatienteController.deletePatiente
);

//pag psicologos
routes.get(
	'/admin/findPsychologist',
	PsychologistController.findAllPsycologists
);

routes.put(
	'/admin/:id_user/disable_enablePsychologist',
	PsychologistController.disable_enablePsychologist
);

routes.delete(
	'/admin/:id_user/deletePsychologist',
	PsychologistController.deletePsychologist
);

//TELAS PSICOLOGO
//AGENDA
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

//TELAS USUARIO
//Exibir no mapa
routes.get('/filter', ClientController.findAllPsychologistClientsFilter);

//Exibir na lista
routes.get('/listar', ClientController.findPsychologistProfileWithUserName);

//Exibir perfil do psicologo
routes.get(
	'/Psychologist/findAllPerfilPsychologist',
	PsychologistController.findAllPerfil
);

module.exports = {routes, authRoute};
