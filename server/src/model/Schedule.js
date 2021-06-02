const { Model, DataTypes } = require('sequelize');

class Schedule extends Model {
	static init(sequelize) {
		super.init({
            diasDisponiveis: DataTypes.STRING, 
            horariosDisponiveis: DataTypes.STRING, 
            fila: DataTypes.INTEGER,
        }, {sequelize});
	}
    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'id_psicologo', as: 'psicologo'})
    }
}

module.exports = Schedule;
