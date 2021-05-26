const mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'tcc',
});

module.exports = pool;
