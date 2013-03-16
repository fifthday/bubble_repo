var user = require('../model/user');

exports.sina_login = function(req, res) {
	user.quick_login(req, res);
};