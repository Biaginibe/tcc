const { Model, DataTypes } = require('sequelize');

class Queue extends Model {
	static init(sequelize) {
		super.init({
            posicao_fila: DataTypes.INTEGER,
        }, {sequelize});
	}
    static associate(models){
        this.belongsTo(models.Psychologist, {foreignKey: 'id_psicologo', as: 'psychologist'})
        this.belongsTo(models.User, {foreignKey: 'id_paciente', as: 'user'})
    }
}

module.exports = Queue;
