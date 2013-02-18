
/*

	数据库结构尚存疑问，
	一 res_id应该是我们自己数据库中生成的资源id，现在协议里设定为新浪id。
	二 用传统关系数据库存储，在查询上似乎有些效率问题，考虑NoSql的解决办法。

*/

var predefine = {
//	"sina_status": {
//		"created_at": "Tue May 31 17:46:55 +0800 2011",
//		"id": 11488058246,
//		"text": "求关注。",
//		"source": "<a href=\"http://weibo.com\" rel=\"nofollow\">新浪微博</a>",
//		"favorited": false,
//		"truncated": false,
//		"in_reply_to_status_id": "",
//		"in_reply_to_user_id": "",
//		"in_reply_to_screen_name": "",
//		"geo": null,
//		"mid": "5612814510546515491",
//		"reposts_count": 8,
//		"comments_count": 9,
//		"annotations": [],
//		"user": {
//			"id": 1404376560,
//			"screen_name": "zaku",
//			"name": "zaku",
//			"province": "11",
//			"city": "5",
//			"location": "北京 朝阳区",
//			"description": "人生五十年，乃如梦如幻；有生斯有死，壮士复何憾。",
//			"url": "http://blog.sina.com.cn/zaku",
//			"profile_image_url": "http://tp1.sinaimg.cn/1404376560/50/0/1",
//			"domain": "zaku",
//			"gender": "m",
//			"followers_count": 1204,
//			"friends_count": 447,
//			"statuses_count": 2908,
//			"favourites_count": 0,
//			"created_at": "Fri Aug 28 00:00:00 +0800 2009",
//			"following": false,
//			"allow_all_act_msg": false,
//			"remark": "",
//			"geo_enabled": true,
//			"verified": false,
//			"allow_all_comment": true,
//			"avatar_large": "http://tp1.sinaimg.cn/1404376560/180/0/1",
//			"verified_reason": "",
//			"follow_me": false,
//			"online_status": 0,
//			"bi_followers_count": 215
//		}
//	},
	"bubble": {
		"res_id": 1,
		"bubble_id": 1,
		"uid": 1,
		"type": 1,			// 图片泡泡
		"vertical_percent": "51.2661",
		"horizontal_percent": "26.1142",
		"start_at": "2",
		"end_at": "3",
		"content": "呵呵",
		"operation": "1",				//普通，增，删，改。
		"signal": "1",
		"customer": "user_data",
		"created_at": "Tue May 31 17:46:55 +0800 2011"
	},
	"error": {
		"error_code": "int",
		"error_msg": "string",
		"error_info": "Object"
	}
}

var protocol = {
	"v1.0": {
		"comment": " 请求参数值类型中的'()'表示默认值，'[]'表示取值范围，'{}'表示本参数是可选参数。"
		"version": 1,
		"url": "http://api.example.com/1/"
		"content": {

//			"fetch_statuses": {
//				"comment": "返回"
//				"url": "statuses/home_timeline",
//				"method": "get|post",
//				"content_type": "json",
//				"request": {
//					"uid": "int",
//					"token": "string",
//					"since_id": "{int64(0)}",
//					"max_id": "{int64(0)}",
//					"count": "{int(20)[1,100]}",
//					"page": "{int(1)}",
//					"feature": "{int(0)}",
//						// 过滤类型ID,此处与新浪接口不同，1:原创,2:图片,4:视频,8:音乐,0:全部。若须返回原创与图片，则传(1|2=)3。
//				},
//				"response": {
//					
//					"statuses": [
//						predefine.sina_status,
//						predefine.sina_status
//					],
//					"bubbles": [
//						{
//							"res_id": 1,
//							"content": [
//								predefine.bubble,
//								predefine.bubble
//							],
//						},
//						{
//							"res_id": 2,
//							"content": [
//								predefine.bubble,
//								predefine.bubble
//							],
//						}
//					],
//					"previous_cursor": 0,				   // 暂未支持
//					"next_cursor": 0,						// 暂未支持
//					"total_number": 2,
//				}
//			},

			"put_bubble": {
				"url": "bubble/put",
				"method": "get|post",
				"content_type": "json",
				"request": {
					"uid": "int",
					"token": "string",
					"res_id": "int64",
					"bubble_type": "int",
					"start_at": "{int}",
					"end_at": "{int}",
					"vertical_percent": "{double}",
					"horizontal_percent": "{double}",
					"content": "string",
					"operation": "int",
					"signal": "int",
					"customer": "string"
				},
				"response": {
					predefine.bubble
				}
			},

			"take_bubbles": {
				"comment": "本协议用来通过资源ID获取关联于资源的吐槽，每个资源最多返回count条吐槽。"
				"url": "bubble/take",
				"method": "get|post",
				"content_type": "json",
				"request": {
					"uid": "int",
					"token": "string",
					"start": "int(0)",
					"count": "int(20)",
					"res_id": "int64",
					"signal": "int"  // signal=0:signal无效。signal=-1:所有signal都有效。signal=固定值,则此值有效。
				},
				"response": {
					"bubbles": [
						predefine.bubble,
						predefine.bubble
					],
				}
			},
			"sina_quick_login": {
				"comment": "使用新浪账号快速登录。",
				"url": "user/login",
				"method": "get|post",
				"content_type": "json",
				"request": {
					"access_token": "string"
				},
				"response": {
					"uid": "int",
					"token": "string",
					"expire": "string"
				}
			}
		}
	}
}