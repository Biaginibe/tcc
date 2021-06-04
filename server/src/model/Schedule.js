const { Model, DataTypes } = require('sequelize');

class Schedule extends Model {
	static init(sequelize) {
		super.init({
            diaDisponivel: DataTypes.STRING, 
            horarioDisponivel: DataTypes.STRING, 
            disponivel: DataTypes.BOOLEAN,
        }, {sequelize});
	}
    static associate(models){
        this.belongsTo(models.Psychologist, {foreignKey: 'id_psicologo', as: 'psychologist'})
    }
}

module.exports = Schedule;
