const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//importando o controllerAdmin
const admin = require('./controller/controllerAdmin');

//listar todos os usuarios 
app.get('/admin', admin.listAllUsers)

//listar todos os usuarios que são PACIENTES
app.get('/admin/paciente', admin.listAllPaciente);

//listar todos os usuarios que são PSICOLOGOS!
app.get('/admin/psicologo', admin.listAllPsicologo);

app.listen(port, () => {
	console.log(`running on port ${port}.`);
});
