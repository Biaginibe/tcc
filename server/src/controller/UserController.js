const User = require('../model/User');

module.exports = {
	async createUser(req, res) {
		const { cpf, nome, ativoInativo, senha, perfil, idade, email, genero } =
			req.body;

		const user = await User.create({
			cpf,
			nome,
			ativoInativo,
			senha,
			perfil,
			idade,
			email,
			genero,
		});

		return res.json(user);
	},
    async findUsers(req, res){
        const users = await User.findAll()

        return res.json(users);
    }
};
