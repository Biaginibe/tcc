const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../model/User');
const Client = require('../model/Client');
const Psychologist = require('../model/Psychologist');
const Schedule = require('../model/Schedule');

const connection = new Sequelize(dbConfig);

User.init(connection);
Client.init(connection);
Psychologist.init(connection);
Schedule.init(connection);

Schedule.associate(connection.models);
Client.associate(connection.models);
Psychologist.associate(connection.models);

module.exports = connection;
