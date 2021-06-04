const User = require('../model/User');
const Schedule = require('../model/Schedule');

module.exports = {
	async createScheduler(req, res) {
		const { id_psicologo } = req.params;
		const { diaDisponivel, horarioDisponivel, disponivel } = req.body;

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
			}
		});

		if (!schedule) {
			return res.status(400).json({ error: 'Schedule not found' });
		}

		return res.json(schedule);
	},
	async findAllSchedules(req, res) {

		const schedule = await Schedule.findAll();

		if (!schedule) {
			return res.status(400).json({ error: 'Schedule not found' });
		}

		return res.json(schedule);
	},
};
