const Queue = require('../model/Queue');
const User = require('../model/User');
const { QueryTypes } = require('sequelize');
const { default: axios } = require('axios');

module.exports = {
	async insertInQueue(req, res) {
		const { id_psico, id_paciente } = req.body;

		const count = await Queue.count({
			where: {
				id_psicologo: id_psico,
			},
		});

		const results = await Queue.create({
			id_psicologo: id_psico,
			id_paciente: id_paciente,
			posicao_fila: count + 1,
		});

		if (!results)
			return res.status(400).json({ error: 'Erro ao inserir na fila.' });

		return res.json(results);
	},

	async quitQueue(req, res) {
		const { id_psico, id_paciente } = req.body;

		const { posicao_fila } = await Queue.findOne({
			where: { id_paciente: id_paciente },
		});

		console.log(posicao_fila);

		await Queue.sequelize.query(
			`UPDATE queues SET posicao_fila = (posicao_fila - 1) WHERE posicao_fila > ${posicao_fila} AND id_psicologo = ${id_psico};`,
			{ type: QueryTypes.UPDATE }
		);

		await Queue.destroy({ where: { id_paciente: id_paciente } });

		return res.json(true);
	},

	async hasQueue(req, res) {
		const { id_paciente } = req.body;

		const row = await Queue.findOne({
			where: { id_paciente: id_paciente },
		});

		if (!row) return res.send(false);

		return res.send(true);
	},

	async itsThatQueue(req, res) {
		const { id_paciente, id_psico } = req.body;

		const row = await Queue.findOne({
			where: { id_paciente: id_paciente, id_psicologo: id_psico },
		});

		if (!row) return res.json(false);

		return res.json(true);
	},

	async callTheNext(req, res) {
		const { id_user } = req.body;

		const id_psico = await User.sequelize.query(`SELECT p.id
        FROM users u 
        INNER JOIN clients c
        ON (u.id = c.id_user)
        INNER JOIN psychologists p
        ON (c.id = p.id_cliente)
        WHERE u.id = ${id_user};`, { type: QueryTypes.SELECT });


		const del = await Queue.findOne({where:{id_psicologo: id_psico[0].id, posicao_fila: 0}})

		if(del){
			await Queue.destroy({where:{id_psicologo: id_psico[0].id, posicao_fila: 0}})
		} 

		await Queue.sequelize.query(`update queues set posicao_fila = posicao_fila - 1 where id_psicologo = ${id_psico[0].id};`, {type: QueryTypes.UPDATE})

		const row = await Queue.findOne({where:{id_psicologo: id_psico[0].id, posicao_fila: 0}});

		if(!row){
			return res.status(400).json({ error: 'A fila está vazia' })
		}

		const user = await User.findOne({where:{id: row.dataValues.id_paciente}})

		axios.post('https://exp.host/--/api/v2/push/send', {
			to: user.dataValues.notificationToken,
			sound: "default",
			title: "Chegou a sua vez!",
			body: "Entre em contato com o profissional que você estava na fila, agora na tela do perfil dele você vai encontrar um botão para contato"
		})

		

		const data = row.dataValues

        return res.json(data)
	},

	async position(req, res){
		const {id_paciente} = req.body;


		const data = await Queue.findOne({where:{id_paciente: id_paciente}});

		if(!data){
			return res.json(null)
		}

		const posicao = data.dataValues.posicao_fila;

		return res.json(posicao)
	}
};
