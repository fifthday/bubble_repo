
exports.make_error = function(code, msg) {
	var err = {};
	err.error_code = code;
	err.error_msg = msg;

	return err;
}