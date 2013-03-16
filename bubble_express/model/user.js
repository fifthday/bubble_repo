var dbsql = require("../helper/dbsql");
var make_error = require("../helper/make_error");
var helper = require("../helper/helper");
var weibo_api = require("../helper/weibo_api");

exports.quick_login = function(req, res) {

	var sina_access_token = req.param('sina_access_token');

	// console.log(sina_access_token);

	if (sina_access_token != undefined) {

		weibo_api.get_sina_uid(sina_access_token, function(err, sina_uid) {
			if (err != undefined) {
				// console.log(err);

				res.send(make_error.make_error(-1, "Invalid access_token!", err));

			} else {

				dbsql.get_user_pool().getConnection(function(err, connection) {
					if (err != undefined) {
						res.send(make_error.make_error(-2, "Database Error!", err));

					} else {

						connection.query("select * from sina_user_table where sina_uid=" + sina_uid, function(err, rows, fields) {
							if (err != undefined) {
								res.send(make_error.make_error(-2, "Database Error!", err));
							} else {
								// console.log(rows);
								// console.log(fields);

								var create_at = helper.gettime();
								var expire_in = get_expire();
								var token = generate_token(create_at);

								if (rows.length > 0) {
									var uid = rows[0].myuid;
									if (uid != undefined) {

										connection.query("update user_table set token=?,create_at=?,expire_in=? where uid=?", [token, create_at, expire_in, uid], function(err) {
											if (err != undefined) {
												res.send(make_error.make_error(-2, "Database Error!", err));
											} else {
												var response = {
													"uid": uid,
													"token": token,
													"create_at": create_at,
													"expire_in": expire_in
												};

												res.send(response);
											}
										});

									} else {
										res.send(make_error.make_error(-2, "Database Error!"));
									}
								} else {

									connection.query("begin", function(err) {
										if (err != undefined) {
											res.send(make_error.make_error(-2, "Database Error!", err));
										} else {
											connection.query("insert into user_table values(null,?,?,?,now())", [token, create_at, expire_in], function(err, results) {
												if (err != undefined) {
													connection.query("rollback");
													res.send(make_error.make_error(-2, "Database Error!", err));
												} else {
													var uid = results.insertId;

													connection.query("insert into sina_user_table values(?,?,?,now())", [sina_uid, sina_access_token, uid], function(err) {

														if (err != undefined) {
															connection.query("rollback");
															res.send(make_error.make_error(-2, "Database Error!", err));
														} else {
															connection.query("commit", function(err) {

																if (err != undefined) {
																	connection.query("rollback");
																	res.send(make_error.make_error(-2, "Database Error!", err));
																} else {
																	var response = {
																		"uid": uid,
																		"token": token,
																		"create_at": create_at,
																		"expire_in": expire_in
																	};

																	res.send(response);
																}
															});
														}
													});
												}
											});
										}
									});
								}
							}
						});
					}
					if (connection != undefined) {
						connection.end();
					}
				});
			}
		});

	} else {
		res.send(make_error.make_error(-1, "Invalid access_token!"));
	}

};
exports.check_token = function(uid, token, callback) {

	if (helper.isnotNull(uid) && helper.isnotNull(token)) {
		dbsql.get_user_pool().getConnection(function(err, connection) {
			if (err != undefined) {
				callback(err, null);
			} else {
				connection.query("select uid from user_table where uid=? and token=?", [uid, token], function(err, rows, fields) {
					if (err != undefined) {
						callback(err, null);
					} else {
						callback(null, (rows.length === 0) ? false : true);
					}
				});
			}
		});
	} else {
		callback(make_error.make_error(-5, "Invalid token!"), null);
	}

};


function generate_token(seed) {

	return helper.md5(helper.randomString(6) + seed);
}

function get_expire() {

	return 60 * 60 * 24 * 15;
}