const { Model, DataTypes } = require('sequelize');

class Psychologist extends Model {
	static init(sequelize) {
		super.init({
            metodologia: DataTypes.STRING, 
            numeroContato: DataTypes.STRING, 
            prefFaixaEtaria: DataTypes.STRING,
            valorConsulta: DataTypes.STRING,
            tempoSessao: DataTypes.STRING,
            descricao: DataTypes.STRING,
            crp: DataTypes.STRING,
        }, {sequelize});
	}
}

module.exports = Psychologist;
