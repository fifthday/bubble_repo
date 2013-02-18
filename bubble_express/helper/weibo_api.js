var weibo = require("weibo");
weibo.init("weibo", "3816336651", "86e020ffcb12e5df679d4790640c51a1", "http://www.example1.com");

exports.get_sina_uid = function(access_token, callback) {
	var user_req = {
		blogtype: "weibo",
		access_token: access_token
	}
	weibo.get_uid(user_req, function(err, info) {

		if(err) {
			callback(err);
		} else {
			callback(null, info.uid);
		}
	});
}