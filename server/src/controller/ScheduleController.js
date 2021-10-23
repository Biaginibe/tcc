const User = require('../model/User');
const Schedule = require('../model/Schedule');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

module.exports = {
	async createSchedule(req, res) {
		const { id_user } = req.params;
		const { diaDisponivel, horarioDisponivel, disponivel } = req.query;

		const psychologist = await User.sequelize.query(
			`SELECT p.id from users u 
		INNER JOIN clients c on c.id_user = u.id
		INNER JOIN psychologists p on c.id = p.id_cliente 
		where u.id=${id_user} `,
			{ type: QueryTypes.SELECT }
		);

		const id_psicologo = psychologist[0].id;

		if (!psychologist) {
			return res.status(400).json({ error: 'Psychologist not found.' });
		}
		const schedule = await Schedule.create({
			diaDisponivel,
			horarioDisponivel,
			disponivel,
			id_psicologo,
		});

		return res.send(schedule);
	},

	async findScheduleByPsychologist(req, res) {
		const { id_user } = req.params;

		const psychologist = await User.sequelize
			.query(
				`SELECT p.id from users u 
		INNER JOIN clients c on c.id_user = u.id
		INNER JOIN psychologists p on c.id = p.id_cliente 
		where u.id=${id_user} `,
				{ type: QueryTypes.SELECT }
			)
			.catch((err) => console.log(err));

		const id_psicologo = psychologist[0].id;

		const schedule = await Schedule.findAll({
			where: {
				id_psicologo: id_psicologo,
			},
		});

		if (!schedule) {
			return res.status(400).json({ error: 'Schedule not found' });
		}

		return res.json(schedule);
	},

	async findDataOfOneSchedule(req, res) {
		const { id } = req.query;
		const { id_user } = req.params;

		const psychologist = await User.sequelize.query(
			`SELECT p.id from users u 
		INNER JOIN clients c on c.id_user = u.id
		INNER JOIN psychologists p on c.id = p.id_cliente 
		where u.id=${id_user} `,
			{ type: QueryTypes.SELECT }
		);

		const id_psicologo = psychologist[0].id;

		const schedule = await Schedule.sequelize.query(
			`SELECT id, diaDisponivel, horarioDisponivel
			FROM schedules 
			WHERE id_psicologo = ${id_psicologo}
			AND id =  ${id};`,
			{ type: QueryTypes.SELECT }
		);

		if (!schedule) {
			return res.status(400).json({ error: 'Schedule not found' });
		}

		return res.json(schedule);
	},

	async enable_disableSchedule(req, res) {
		const { id_user, id_schedule } = req.params;

		const psychologist = await User.sequelize.query(
			`SELECT p.id from users u 
		INNER JOIN clients c on c.id_user = u.id
		INNER JOIN psychologists p on c.id = p.id_cliente 
		where u.id=${id_user} `,
			{ type: QueryTypes.SELECT }
		);

		const id_psicologo = psychologist[0].id;

		const schedule = await Schedule.findOne({
			where: {
				[Op.and]: [{ id: id_schedule }, { id_psicologo: id_psicologo }],
			},
		});
		if (schedule.dataValues.disponivel) {
			await Schedule.update(
				{ disponivel: false },
				{
					where: {
						[Op.and]: [
							{ id: id_schedule },
							{ id_psicologo: id_psicologo },
						],
					},
				}
			);
			const change = `Schedule with id ${id_schedule} closed successfully`;
			return res.json(change);
		} else {
			await Schedule.update(
				{ disponivel: true },
				{
					where: {
						[Op.and]: [
							{ id: id_schedule },
							{ id_psicologo: id_psicologo },
						],
					},
				}
			);
			const change = `Open calendar with id ${id_schedule} successfully`;
			return res.json(change);
		}
	},

	async updateSchedule(req, res) {
		const { id_user, id_schedule } = req.params;
		const { diaDisponivel, horarioDisponivel } = req.query;

		const psychologist = await User.sequelize.query(
			`SELECT p.id from users u 
		INNER JOIN clients c on c.id_user = u.id
		INNER JOIN psychologists p on c.id = p.id_cliente 
		where u.id=${id_user} `,
			{ type: QueryTypes.SELECT }
		);

		const id_psicologo = psychologist[0].id;

		const schedule = await Schedule.findOne({
			where: {
				[Op.and]: [{ id: id_schedule }, { id_psicologo: id_psicologo }],
			},
		});

		if (!schedule) {
			return res.status(400).json({ error: 'schedule not found' });
		}
		await Schedule.update(
			{
				diaDisponivel: diaDisponivel,
				horarioDisponivel: horarioDisponivel,
			},
			{
				where: {
					[Op.and]: [
						{ id: id_schedule },
						{ id_psicologo: id_psicologo },
					],
				},
			}
		);
		success = `Schedule with id ${id_schedule} successfully updated`;
		return res.json(success);
	},

	async deleteSchedule(req, res) {
		const { id_user, id_schedule } = req.params;

		const psychologist = await User.sequelize.query(
			`SELECT p.id from users u 
		INNER JOIN clients c on c.id_user = u.id
		INNER JOIN psychologists p on c.id = p.id_cliente 
		where u.id=${id_user} `,
			{ type: QueryTypes.SELECT }
		);

		const id_psicologo = psychologist[0].id;

		const schedule = await Schedule.findOne({
			where: {
				[Op.and]: [{ id: id_schedule }, { id_psicologo: id_psicologo }],
			},
		});

		if (!schedule) {
			return res.status(400).json({ error: 'schedule not found' });
		}

		await Schedule.destroy({
			where: {
				id: id_schedule,
			},
		});
		success = `Schedule with id ${id_schedule} successfully deleted`;
		return res.json(success);
	},

	async findAllbyWeekSchedules(req, res) {
		const { id_user } = req.params;
		const scheduleSeg = [];
		const scheduleTer = [];
		const scheduleQua = [];
		const scheduleQui = [];
		const scheduleSex = [];
		const scheduleSab = [];
		const scheduleDom = [];

		const psychologist = await User.sequelize.query(
			`SELECT p.id 
			FROM users u 
		INNER JOIN clients c ON c.id_user = u.id
		INNER JOIN psychologists p ON p.id_cliente = c.id
		WHERE u.id=${id_user}`,
			{ type: QueryTypes.SELECT }
		);

		const id_psicologo = psychologist[0].id;

		const schedules = await Schedule.findAll({
			where: {
				id_psicologo: id_psicologo,
			},
		});

		var sum = 0;


		schedules.map((schedule) => {
			if (schedule.dataValues.diaDisponivel === 'Segunda' && schedule.dataValues.disponivel) {
				scheduleSeg.push(schedule);
				sum++
			} else if (schedule.dataValues.diaDisponivel === 'Terça' && schedule.dataValues.disponivel) {
				scheduleTer.push(schedule);
				sum++
			} else if (schedule.dataValues.diaDisponivel === 'Quarta' && schedule.dataValues.disponivel) {
				scheduleQua.push(schedule);
				sum++
			} else if (schedule.dataValues.diaDisponivel === 'Quinta' && schedule.dataValues.disponivel) {
				scheduleQui.push(schedule);
				sum++
			} else if (schedule.dataValues.diaDisponivel === 'Sexta' && schedule.dataValues.disponivel) {
				scheduleSex.push(schedule);
				sum++
			} else if (schedule.dataValues.diaDisponivel === 'Sabado' && schedule.dataValues.disponivel) {
				sum++
				scheduleSab.push(schedule);
			} else if(schedule.dataValues.diaDisponivel === 'Domingo' && schedule.dataValues.disponivel) {
				scheduleDom.push(schedule);
				sum++
			}
		});

		console.log(sum)

		return res.send({
			scheduleSeg,
			scheduleTer,
			scheduleQua,
			scheduleQui,
			scheduleSex,
			scheduleSab,
			scheduleDom,
			sum
		});
	},

	//método para dev
	async findAllSchedules(req, res) {
		const schedule = await Schedule.findAll();

		if (!schedule) {
			return res.status(400).json({ error: 'Schedule not found' });
		}

		return res.json(schedule);
	},
};
