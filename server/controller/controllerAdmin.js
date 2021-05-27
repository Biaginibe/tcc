const db = require('../config/db');
const Flatted = require('flatted');

module.exports = {
	async listAllUsers(req, res) {
		try {
			let sql = 'SELECT * FROM usuario as solution';
			const data = await db.query(sql, function (error, results, fields) {
				if (error) throw error;
				return res.json(results);
			});
		} catch (error) {
			console.log(error);
		}
	},
	async listAllPaciente(req, res) {
		try {
			let sql = 'SELECT * FROM usuario as solution where perfil = 3';
			const data = await db.query(sql, function (error, results, fields) {
				if (error) throw error;
				return res.json(results);
			});
		} catch (error) {
			console.log(error);
		}
	},
	async listAllPsicologo(req, res) {
		try {
			let sql = 'SELECT * FROM usuario as solution where perfil = 2';
			const data = await db.query(sql, function (error, results, fields) {
				if (error) throw error;
				return res.json(results);
			});
		} catch (error) {
			console.log(error);
		}
	},
	async delete(id, res) { /* função geral assim como o desativar visto que usa o id no where */
		try {
			let sql = `delete FROM usuario where id = ${id}`;
			const data = await db.query(sql, function (error, results, fields) {
				if (error) throw error;
				return res.json(results);
			});
		} catch (error) {
			console.log(error);
		}
	},
	async desativarAtivar(id, ativoInativo, res) {
		if (ativoInativo == 'A') {
			try {
				let sql = `update usuario set ativoInativo = "I" where id = ${id}`;
				const data = await db.query(sql, function (error, results, fields) {
					if (error) throw error;
					return res.json(results);
				});
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				let sql = `update usuario set ativoInativo = "A" where id = ${id}`;
				const data = await db.query(sql, function (error, results, fields) {
					if (error) throw error;
					return res.json(results);
				});
			} catch (error) {
				console.log(error);
			}
		}
	},
};
