const express = require('express');
const authMiddleware = require('./middlewares/auth');
const UserController = require('./controller/UserController');
const PatienteController = require('./controller/PatienteController');
const PsychologistController = require('./controller/PsychologistController');
const ScheduleController = require('./controller/ScheduleController');
const ClientController = require('./controller/ClientController');
const AuthController = require('./controller/AuthController');
const QueueController = require('./controller/QueueController')

const authRoute = express.Router();
const routes = express.Router();
routes.use(authMiddleware);

//AUTENTICAÇÃO
authRoute.post('/login', AuthController.signIn);

authRoute.post('/valid', AuthController.validateToken);

//Registro
authRoute.post('/admin/createUser', AuthController.registerUser);

authRoute.post('/freeAccess/:id_user/client', AuthController.createClient);

authRoute.post(
	'/Psychologist/:id_cliente/incrementPsychologist',
	PsychologistController.createpsychologist
);

//TESTES ---DEPOIS TIRAR DO AUTHROUTE
authRoute.post('/psychologist/position', QueueController.position)
routes.post('/psychologist/callNext', QueueController.callTheNext)

routes.put('/update_userToken/:id_user', UserController.updateUserNotiToken)

routes.post('/patiente/quitQueue', QueueController.quitQueue)

routes.post('/patiente/insertQueue', QueueController.insertInQueue)

routes.post('/patiente/hasQueue', QueueController.hasQueue)

routes.post('/patiente/itsThatQueue', QueueController.itsThatQueue)

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
routes.get(
	'/patientes/:id_user/findPacientejoinUsers',
	PatienteController.findPacientejoinUsers
);
routes.get(
	'/patientes/:id_user/findOnebyIDPatientes',
	PatienteController.findOnebyIDPatientes
)
routes.put(
	'/patientes/:id_user/updatePatientes',
	PatienteController.updatePatientes
)



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
routes.put(
	'/psychologist/:id_user/updatePsychologists',
	PsychologistController.updatePsychologists
)

//TELAS PSICOLOGO
//AGENDA
routes.post(
	'/psychologist/:id_user/createSchedule',
	ScheduleController.createSchedule
);

routes.get(
	'/psychologist/:id_user/findSchedule',
	ScheduleController.findScheduleByPsychologist
);
routes.get(
	'/psychologist/:id_user/findOneSchedule',
	ScheduleController.findDataOfOneSchedule
);

routes.get(
	'/psychologist/findAllSchedulers',
	ScheduleController.findAllSchedules
);

routes.put(
	'/psychologist/:id_user/:id_schedule/disable_enableSchedule',
	ScheduleController.enable_disableSchedule
);

routes.put(
	'/psychologist/:id_user/:id_schedule/updateSchedule',
	ScheduleController.updateSchedule
);

routes.delete(
	'/psychologist/:id_user/:id_schedule/deleteSchedule',
	ScheduleController.deleteSchedule
);


//TELAS USUARIO
//Exibir no mapa
routes.get(
	'/psychologist/:id_user/findAllbyWeekSchedules',
	ScheduleController.findAllbyWeekSchedules
);

//LOCALIZAÇÃO!!
routes.get('/', ClientController.findAllPsychologistClientsFilter);

routes.get('/filter', ClientController.findAllPsychologistClientsFilter);

//Exibir na lista
routes.get('/listar', ClientController.findPsychologistProfileWithUserName);

//Exibir perfil do psicologo
routes.get(
	'/Psychologist/findAllPsychologist',
	PsychologistController.findAllPerfil
);

routes.get(
	'/Psychologist/:id_user/findPsychologistsjoinUsers',
	PsychologistController.findPsychologistsjoinUsers
);

module.exports = { routes, authRoute };
