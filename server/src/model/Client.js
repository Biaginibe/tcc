const { Model, DataTypes } = require('sequelize');

class Client extends Model {
	static init(sequelize) {
		super.init({
            endereco: DataTypes.STRING, 
            latitude: DataTypes.STRING,
            longitude: DataTypes.STRING,
        }, {sequelize});
	}
    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'id_user', as: 'user'})
    }
}

module.exports = Client;
