const db = require('../config/db')

module.exports = {

	async listAllPaciente(req, res) {
		try {
			let response = await db.query('SELECT * FROM paciente');
			res.json(response);
		} catch (error) {
			console.log(error);
		}
	},
    async listAllPsicologo(req, res) {
		try {
			let response = await db.query('SELECT * FROM PSICOLOGO');
			res.json(response[0]);
		} catch (error) {
			console.log(error);
		}
	}
};