const User = require('../model/User');
//const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {
	async signIn(req, res) {
		const { cpf, senha } = req.body; //no front vou passar as variaveis assim: axios.post('rota', {cpf, senha})

		const user = await User.findOne({ where: { cpf: cpf } });

		if (!user) {
			return res.status(400).send({ error: 'Usuario não encontrado!' });
		}

		if (senha != user.senha) {
			return res.status(400).send({ error: 'Senha incorreta.' });
		}

		const token = jwt.sign({ id: user.id }, authConfig.secret, {
			expiresIn: 1209600, //14 dias
		});

		return res.send({user, token});
	},
};
