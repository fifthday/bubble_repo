/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50525
Source Host           : localhost:3306
Source Database       : bubble_account

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2013-02-21 10:01:40
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `sina_user_table`
-- ----------------------------
DROP TABLE IF EXISTS `sina_user_table`;
CREATE TABLE `sina_user_table` (
  `sina_uid` varchar(255) NOT NULL,
  `sina_token` varchar(255) DEFAULT NULL,
  `myuid` bigint(20) unsigned DEFAULT NULL,
  `generate_at` datetime DEFAULT NULL,
  PRIMARY KEY (`sina_uid`),
  UNIQUE KEY `f_myuid` (`myuid`) USING BTREE,
  CONSTRAINT `f_myuid` FOREIGN KEY (`myuid`) REFERENCES `user_table` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sina_user_table
-- ----------------------------

-- ----------------------------
-- Table structure for `user_table`
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `uid` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(32) DEFAULT NULL,
  `create_at` bigint(20) DEFAULT NULL,
  `expire_in` bigint(20) DEFAULT NULL,
  `generate_at` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_table
-- ----------------------------
