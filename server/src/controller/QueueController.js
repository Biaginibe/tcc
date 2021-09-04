const Queue = require('../model/Queue');

module.exports = {
	async insertInQueue(req, res) {
		const { id_psico, id_paciente } = req.body;

		const count = await Queue.count({
            where: {
                id_psicologo: id_psico
            }
        })

        const results = await Queue.create({
            id_psicologo: id_psico,
            id_paciente: id_paciente,
            posicao_fila: count + 1,
        })

        if(!results) return res.status(400).json({error: 'Erro ao inserir na fila.'})

        return res.json(results)
	},
};
