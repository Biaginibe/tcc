const Client = require('../model/Client');
const User = require('../model/User');
const Psychologist = require('../model/Psychologist');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');

module.exports = {
	async findPsychologistProfileWithUserName(req, res) {
		const {
			abordagem,
			tipoAtendimento,
			valor,
			genero,
			faixaEtaria,
			tempoSessao,
		} = req.query;

		const profiles = await Psychologist.sequelize.query(
			`SELECT p.id as id, 
					p.tipoAtendimento, 
					u.nome as nome, 
					u.genero as genero, 
					p.metodologia as metodologia, 
					p.prefFaixaEtaria, 
					p.valorConsulta, 
					p.tempoSessao as tempoSessao 
			FROM psychologists p 
			INNER JOIN clients c ON (c.id = p.id_cliente) 
			INNER JOIN users u ON (u.id = c.id_user)
			WHERE u.perfil= 2 
			AND IF('${abordagem}' != '', p.metodologia = '${abordagem}', p.metodologia IS NOT NULL)
			AND IF('${tipoAtendimento}' != '', p.tipoAtendimento = '${tipoAtendimento}', p.tipoAtendimento IS NOT NULL)
			AND IF('${valor}' != '', p.valorConsulta = '${valor}', p.valorConsulta IS NOT NULL)
			AND IF('${genero}' != '', u.genero = '${genero}', u.genero IS NOT NULL)
			AND IF('${faixaEtaria}' != '', p.prefFaixaEtaria = '${faixaEtaria}', p.prefFaixaEtaria IS NOT NULL)
			AND IF('${tempoSessao}' != '', p.tempoSessao = '${tempoSessao}', p.tempoSessao IS NOT NULL);`,
			{ type: QueryTypes.SELECT }
		);
		return res.send(profiles);
	},

	async findPsychologistProfileWithUserNameLike(req, res) {
		const {
			abordagem,
			tipoAtendimento,
			valor,
			genero,
			faixaEtaria,
			tempoSessao,
		} = req.query;

		const { like } = req.body;

		const profiles = await Psychologist.sequelize.query(
			`SELECT p.id as id, 
					p.tipoAtendimento as tipo, 
					u.nome as nome, 
					u.genero as genero, 
					p.metodologia as metodologia, 
					p.prefFaixaEtaria as faixaEtaria, 
					p.valorConsulta as valor, 
					p.tempoSessao as tempoSessao,
          u.id as id_u
			FROM psychologists p 
			INNER JOIN clients c ON (c.id = p.id_cliente) 
			INNER JOIN users u ON (u.id = c.id_user)
			WHERE u.perfil= 2 
			AND IF('${abordagem}' != '', p.metodologia = '${abordagem}', p.metodologia IS NOT NULL)
			AND IF('${tipoAtendimento}' != '', p.tipoAtendimento = '${tipoAtendimento}', p.tipoAtendimento IS NOT NULL)
			AND IF('${valor}' != '', p.valorConsulta = '${valor}', p.valorConsulta IS NOT NULL)
			AND IF('${genero}' != '', u.genero = '${genero}', u.genero IS NOT NULL)
			AND IF('${faixaEtaria}' != '', p.prefFaixaEtaria = '${faixaEtaria}', p.prefFaixaEtaria IS NOT NULL)
			AND IF('${tempoSessao}' != '', p.tempoSessao = '${tempoSessao}', p.tempoSessao IS NOT NULL);`,
			{ type: QueryTypes.SELECT }
		);

		const profilesLike = await Psychologist.findAll({
			raw: false,
			nest: true,
			include: [
				{
					model: Client,
					as: 'client',
					include: {
						model: User,
						as: 'user',
						where: {
							nome: {
								[Op.like]: `%${like}`,
							},
						},
					},
				},
			],
		});

		var intersection = profilesLike.filter((profileLike) => {
			return profiles.some((profile) => {
				if (profileLike.dataValues.client !== null) {
					return (
						profile.id === profileLike.id &&
						profile.id_u ===
							profileLike.dataValues.client.dataValues.user.id
					);
				}
			});
		});

		let resolve = [];
		console.log(resolve);
		if (resolve !== []) resolve = [];
		intersection.map((e) => {
			let arr = {
				metodologia: e.dataValues.metodologia,
				valorConsulta: e.dataValues.valorConsulta,
				prefFaixaEtaria: e.dataValues.prefFaixaEtaria,
				tipoAtendimento: e.dataValues.tipoAtendimento,
				tempoSessao: e.dataValues.tempoSessao,
				id: e.dataValues.id,
				genero: e.dataValues.client.dataValues.user.genero,
				nome: e.dataValues.client.dataValues.user.nome,
			};
			resolve.push(arr);
		});

		return res.json(resolve);
	},

	async findAllPsychologistClientsFilter(req, res) {
		const {
			abordagem,
			tipoAtendimento,
			valor,
			genero,
			faixaEtaria,
			tempoSessao,
		} = req.query;

		const profiles = await Psychologist.sequelize.query(
			`SELECT c.* 
			FROM clients c 
			INNER JOIN users u ON (u.id = c.id_user) 
			INNER JOIN psychologists p ON (p.id_cliente = c.id)
			WHERE u.perfil= 2 
			AND IF('${abordagem}' != '', p.metodologia = '${abordagem}', p.metodologia IS NOT NULL)
			AND IF('${tipoAtendimento}' != '', p.tipoAtendimento = '${tipoAtendimento}', p.tipoAtendimento IS NOT NULL)
			AND IF('${valor}' != '', p.valorConsulta = '${valor}', p.valorConsulta IS NOT NULL)
			AND IF('${genero}' != '', u.genero = '${genero}', u.genero IS NOT NULL)
			AND IF('${faixaEtaria}' != '', p.prefFaixaEtaria = '${faixaEtaria}', p.prefFaixaEtaria IS NOT NULL)
			AND IF('${tempoSessao}' != '', p.tempoSessao = '${tempoSessao}', p.tempoSessao IS NOT NULL);`,
			{ type: QueryTypes.SELECT }
		);

		return res.send(profiles);
	},
};
