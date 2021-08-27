const User = require('../model/User');
const Schedule = require('../model/Schedule');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

module.exports = {
	async createSchedule(req, res) {
		const { id_psicologo } = req.params;
		const { diaDisponivel, horarioDisponivel, disponivel } = req.query;

		const psychologist = await User.findByPk(id_psicologo);

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
		const { id_psicologo } = req.params;

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
		const { id_psicologo } = req.params;
		const { id } = req.query;

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
		const { id_psicologo, id_schedule } = req.params;
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
						[Op.and]: [{ id: id_schedule }, { id_psicologo: id_psicologo }],
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
						[Op.and]: [{ id: id_schedule }, { id_psicologo: id_psicologo }],
					},
				}
			);
			const change = `Open calendar with id ${id_schedule} successfully`;
			return res.json(change);
		}
	},

	async updateSchedule(req, res) {
		const { id_psicologo, id_schedule } = req.params;
		const { diaDisponivel, horarioDisponivel } = req.query;
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
					[Op.and]: [{ id: id_schedule }, { id_psicologo: id_psicologo }],
				},
			}
		);
		success = `Schedule with id ${id_schedule} successfully updated`;
		return res.json(success);
	},

	async deleteSchedule(req, res) {
		const { id_psicologo, id_schedule } = req.params;
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
		const { id_psicologo } = req.params;
		const schedule = await Schedule.findAll();
		const scheduleSeg = await Schedule.findAll({
			where:{
				diaDisponivel: "Segunda",
				id_psicologo: id_psicologo
			}
		});
		const scheduleTer = await Schedule.findAll({
			where:{
				diaDisponivel: "Terça",
				id_psicologo: id_psicologo
			}
		});
		const scheduleQua = await Schedule.findAll({
			where:{
				diaDisponivel: "Quarta",
				id_psicologo: id_psicologo
			}
		});
		const scheduleQui = await Schedule.findAll({
			where:{
				diaDisponivel: "Quinta",
				id_psicologo: id_psicologo
			}
		});
		const scheduleSex = await Schedule.findAll({
			where:{
				diaDisponivel: "Sexta",
				id_psicologo: id_psicologo
			}
		});


		if (!schedule) {
			return res.status(400).json({ error: 'Schedule not found' });
		}

		return res.send({
			scheduleSeg, scheduleTer, scheduleQua, scheduleQui, scheduleSex});
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
