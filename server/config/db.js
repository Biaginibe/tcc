const mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhoost',
	user: 'root',
	password: '',
	database: 'tcc',
});

module.exports = pool;
