const Queue = require('../model/Queue');
const { QueryTypes } = require("sequelize");

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

    async quitQueue(req, res) {
        const { id_psico, id_paciente } = req.body;

        const {posicao_fila} = await Queue.findOne({where:{id_paciente: id_paciente}})

        console.log(posicao_fila)

        await Queue.sequelize.query(`UPDATE queues SET posicao_fila = (posicao_fila - 1) WHERE posicao_fila > ${posicao_fila} AND id_psicologo = ${id_psico};`, { type: QueryTypes.UPDATE })

        await Queue.destroy({where:{id_paciente: id_paciente}});

        return res.json(true)
    },

    async hasQueue(req, res){
        const {id_paciente} = req.body;

        const row = await Queue.findOne({where:{id_paciente:id_paciente}});
        
        if(!row) return res.send(false);

        return res.send(true);
    },

    async itsThatQueue(req, res){
        const {id_paciente, id_psico} = req.body;

        const row = await Queue.findOne({where:{id_paciente:id_paciente, id_psicologo: id_psico}});
        
        if(!row) return res.json(false);

        return res.json(true);
    }
};
