
exports.make_error = function(code, msg, error) {
	var err = {};
	err.error_code = code;
	err.error_msg = msg;

	console.log(err);
	console.log(error);

	return err;
}