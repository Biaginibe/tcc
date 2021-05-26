const db = require('../config/db');
const Flatted = require('flatted');

module.exports = {
	async listAllPaciente(req, res) {
		try {
			let sql = 'SELECT * FROM paciente as solution';
			const data = await db.query(sql, function (error, results, fields) {
				if (error) throw error;				
				return res.json(results);
			});
			
		} catch (error) {
			console.log('ERRO PORRA ' + error);
		}
	},
	async listAllPsicologo(req, res) {
		try {
			let sql = 'SELECT * FROM psicologo as solution';
			const data = await db.query(sql, function (error, results, fields) {
				if (error) throw error;
				return res.json(results);
			});
		} catch (error) {
			console.log(error);
		}
	},
};
