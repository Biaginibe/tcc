const { Model, DataTypes } = require('sequelize');

class Client extends Model {
	static init(sequelize) {
		super.init({
            endereco: DataTypes.STRING, 
            flagLat: DataTypes.STRING, 
            latitude: DataTypes.INTEGER,
            flagLong: DataTypes.STRING, 
            longitude: DataTypes.INTEGER,
        }, {sequelize});
	}
}

module.exports = Client;
