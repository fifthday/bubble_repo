var mysql = require("mysql");

var user_pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345678',
  database: 'bubble_account',
  supportBigNumbers: true,
  // debug: true
});
user_pool.connectionLimit = 20;

exports.get_user_pool = function() {

	return user_pool;
}

