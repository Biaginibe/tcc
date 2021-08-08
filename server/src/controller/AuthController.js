const User = require('../model/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {
	async signIn(req, res) {
		const { cpf, pass } = req.body; //no front vou passar as variaveis assim: axios.post('rota', {cpf, pass})

		console.log(cpf + '  hehe  ' + pass)

		const user = await User.findOne({ where: { cpf: cpf } });

		if (!user) {
			return res.status(400).send({ error: 'Usuario não encontrado!' });
		}

		if (pass != user.pass) {
			return res.status(400).send({ error: 'Senha incorreta.' });
		}

		let type;
		if (user.perfil == 1) {
			type = 'admin';
		} else if ((user.perfil = 2)) {
			type = 'psicologo';
		} else {
			type = 'paciente';
		}
		const token = jwt.sign({ id: user.id }, authConfig.secret, {
			expiresIn: 1209600, //14 dias
		});
		
		return res.send({
			user,
			type,
			token,
		});
	},

	async registerUser(req, res) {
		const { cpf, nome, ativo, pass, perfil, idade, email, genero } =
			req.body;

		if (await User.findOne({ where: { cpf: cpf } })) {
			return res
				.status(400)
				.send({ error: 'Este CPF já possui uma conta!' });
		}
		try {
			const user = await User.create({
				cpf,
				nome,
				ativo,
				senha,
				perfil,
				idade,
				email,
				genero,
			});

			const token = jwt.sign({ id: user.id }, authConfig.secret, {
				expiresIn: 1209600, //14 dias
			});

			let type;
			if (user.perfil == 1) {
				type = 'admin';
			} else if ((user.perfil = 2)) {
				type = 'psicologo';
			} else {
				type = 'paciente';
			}

			return res.json({
				user,
				type,
				token,
			});
		} catch {
			return res.status(400).send({
				error: 'Falha no registro, por favor tente novamente.',
			});
		}
	},

	async validateToken(req, res){
        const token = req.body.token || ''
    
        jwt.verify(token, authConfig.secret, function(err, decoded) {
    
            return res.status(200).send({valid: !err})
    
        })
    },
};
