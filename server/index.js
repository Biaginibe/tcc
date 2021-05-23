const express = require('express');

const app = express();
const port = 3001;

app.use(express.json());

//aqui ele já cai na tela de admin LISTAR TODOS OS PACIENTES
const admin = require('./controller/controllerAdmin');
app.post('/admin/paciente', admin.listAllPaciente);
app.get('/admin', admin.listAllPaciente);

//para LISTAR TODOS OS PSICOLOGOS!
app.post('/admin/psicologo', admin.listAllPsicologo);






app.listen(port, () => {
	console.log(`running on port ${port}.`);
});
