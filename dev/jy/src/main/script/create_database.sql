CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `serialNo` varchar(24) NOT NULL DEFAULT '' ,
  `name` varchar(24) NOT NULL DEFAULT '', 
  `pic_url` varchar(256) DEFAULT 0 ,
  `category_id` int(11) DEFAULT 0  ,
  `category_sub_id` int(11) DEFAULT 0  ,
 `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ,
   PRIMARY KEY (`id`),
   KEY `name` (`name`),
   UNIQUE KEY `serialNo` (`serialNo`),
   KEY category_id_category_sub_id (`category_id`,`category_sub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `type`  tinyint(4) DEFAULT 0,
  `name` varchar(56) NOT NULL DEFAULT '',  
   PRIMARY KEY (`id`),
   KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; 


CREATE TABLE `catstaff_commit` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `name` varchar(24) NOT NULL DEFAULT '' ,
  `phone`varchar(24) NOT NULL DEFAULT '' ,
  `pwd` varchar(24) NOT NULL DEFAULT '',
  `shop_name` varchar(32) DEFAULT 0 ,
  `shop_tel` varchar(32) DEFAULT 0  ,
  `shop_print` varchar(32) DEFAULT 0  ,
  `shop_lat`  FLOAT(16,12) NOT NULL DEFAULT 0.00,
  `shop_lng`  FLOAT(16,12) NOT NULL DEFAULT 0.00,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ,
   PRIMARY KEY (`id`),
   KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `catstaff` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `name` varchar(24) NOT NULL DEFAULT '' ,
  `phone`varchar(24) NOT NULL DEFAULT '' ,
  `pwd` varchar(24) NOT NULL DEFAULT '',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ,
   PRIMARY KEY (`id`),
   KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `name` varchar(24) NOT NULL DEFAULT '' ,
  `phone`varchar(24) NOT NULL DEFAULT '' ,
  `pwd` varchar(24) NOT NULL DEFAULT '', 
  `enable` tinyint(4) DEFAULT 0 ,
  `type` tinyint(4) DEFAULT 0  ,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ,
   PRIMARY KEY (`id`),
   KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; 


CREATE TABLE `regist_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `name` varchar(24) NOT NULL DEFAULT '' ,
  `phone`varchar(24) NOT NULL DEFAULT '' ,
  `pwd` varchar(24) NOT NULL DEFAULT '', 
  `enable` tinyint(4) DEFAULT 0 ,
  `type` tinyint(4) DEFAULT 0  ,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ,
   PRIMARY KEY (`id`),
   UNIQUE KEY phone (`phone`),
   KEY phone_pwd (`phone`,`pwd`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; 


 CREATE TABLE `shop_cart` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `shop_id` bigint(20) NOT NULL DEFAULT 0 ,
  `item_id` bigint(20) NOT NULL DEFAULT 0 ,
  `count` int(11) NOT NULL DEFAULT 0 ,
  `comfirm` tinyint(4) NOT NULL DEFAULT 0 ,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ,
   PRIMARY KEY (`id`),
   KEY shop_id(`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `shop` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `name` varchar(24) NOT NULL DEFAULT '' ,
  `owner_user_id`  bigint(20) NOT NULL DEFAULT 0 ,
  `owner` varchar(24) NOT NULL DEFAULT '' ,
  `owner_phone` varchar(24) NOT NULL DEFAULT '' ,
  `tel` varchar(32) NOT NULL DEFAULT '' ,
  `head_url` varchar(256) NOT NULL DEFAULT '' ,
  `shop_url` varchar(256) NOT NULL DEFAULT '',
  `shop_address` varchar(256) NOT NULL DEFAULT '',
  `audit` tinyint(4)  NOT NUll DEFAULT 0,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `open_time` timestamp NULL,
  `close_time` timestamp NULL,
  `lng`  FLOAT(16,12) NOT NULL DEFAULT 0.00,
  `lat` FLOAT(16,12) NOT NULL DEFAULT 0.00 ,
  `update_time` timestamp NULL ,
   PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE `shop_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `shop_id`  bigint(20) DEFAULT 0,
  `category_id` int(11) NOT NULL DEFAULT 0,
  `category_sub_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(56) NOT NULL DEFAULT '',  
  `score` int(11) NOT NULL DEFAULT 0 ,
   PRIMARY KEY (`id`),
   KEY shop_id_category_id (`shop_id`,`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; 


 CREATE TABLE `items` (                          
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `serialNo` varchar(24) NOT NULL DEFAULT '' ,
  `shop_id` bigint(20) NOT NULL DEFAULT 0 ,
  `name` varchar(24) NOT NULL DEFAULT '' ,
  `category_id` int(11) NOT NULL DEFAULT 0 ,
  `category_sub_id` int(11) NOT NULL DEFAULT 0 ,
  `status` tinyint(4) NOT NULL DEFAULT 0 ,
  `score` int(11) NOT NULL DEFAULT 0 ,
  `count` int(11) NOT NULL DEFAULT 0 ,
  `price` int(11) NOT NULL DEFAULT 0 ,
  `price_new` int(11) NOT NULL DEFAULT 0 ,
  `pic_url` varchar(256) NOT NULL DEFAULT '' ,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ,
   PRIMARY KEY (`id`),  
   KEY  shop_id_category_score (`shop_id`,`category_id`,`score`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



CREATE TABLE `address` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `type` tinyint(4) NOT NULL DEFAULT 0,
  `user_id` bigint(20) NOT NULL DEFAULT 0,
  `city` varchar(24) NOT NULL DEFAULT '' ,
  `province` varchar(24) NOT NULL DEFAULT '' ,
  `district` varchar(24) NOT NULL DEFAULT '' ,
  `phone` varchar(24) NOT NULL DEFAULT '' ,
  `address`  varchar(245) NOT NULL DEFAULT '' ,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ,
   PRIMARY KEY (`id`),
   KEY user_id (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE `device` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `shop_id` bigint(20) NOT NULL DEFAULT 0,
  `type` tinyint(4) NOT NULL DEFAULT 0 ,
  `status` varchar(20) NOT NULL DEFAULT 0 ,
  `token` varchar(32) NOT NULL DEFAULT '',
  `secret_key` varchar(32) NOT NULL DEFAULT '',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ,
   PRIMARY KEY (`id`),
   UNIQUE KEY token (token),
   KEY shop_id(`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `order_id` varchar(32) NOT NULL DEFAULT '' ,
  `shop_id` bigint(20) NOT NULL DEFAULT 0,
  `user_id` bigint(20) NOT NULL DEFAULT 0,
  `address_id`  varchar(245) NOT NULL DEFAULT '' ,
  `remarks`  varchar(245) NOT NULL DEFAULT '' ,
   `info` varchar(8192)  NOT NULL DEFAULT '' ,
  `snapshot` varchar(8192)  NOT NULL DEFAULT '' ,
  `status` tinyint(4) NOT NULL DEFAULT 0 ,
  `price` int(11) NOT NULL DEFAULT 0 ,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ,
   PRIMARY KEY (`id`),
   UNIQUE KEY order_id (`order_id`),
   KEY user_id(`user_id`),
   KEY shop_id(`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `ver` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `ver` varchar(32) NOT NULL DEFAULT '' ,
  `url` varchar(256) NOT NULL DEFAULT '' ,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


测试数据做成

insert into  shop (id,name,owner,owner_phone,lng,lat ) value (1,'name','owner','18600326217',116.300003051758,39.00000095367);
insert into  shop (id,name,owner,owner_phone,lng,lat ) value (2,'name','owner','18600326217',116.300003051758,39.00000095367);


insert into  category (type,name)  value(0,'哈哈镜');
insert into  category (type,name)  value(0,'牛奶');
insert into  category (type,name)  value(0,'速冻');
insert into  category (type,name)  value(0,'饮料');
insert into  category (type,name)  value(0,'酒水');
insert into  category (type,name)  value(0,'香烟');
insert into  category (type,name)  value(0,'矿泉水');
insert into  category (type,name)  value(0,'零食');
insert into  category (type,name)  value(0,'面包');
insert into  category (type,name)  value(0,'方便面');
insert into  category (type,name)  value(0,'火腿肠');
insert into  category (type,name)  value(0,'日用品');
insert into  category (type,name)  value(0,'计生');
insert into  category (type,name)  value(0,'其他');


insert into product (serialNo,name,pic_url,category_id)  values('12121213123','金龙鱼食用油500ml','http://www.baidu.com',12);
insert into product (serialNo,name,pic_url,category_id)  values('12121213123','金龙鱼食用油500ml','http://www.baidu.com',12);
insert into product (serialNo,name,pic_url,category_id)  values('12121213123','金龙鱼食用油500ml','http://www.baidu.com',12);

insert into  shop_category (shop_id,category_id,name,score) value(1,24,'方便面',1);
insert into  shop_category (shop_id,category_id,name,score) value(1,20,'香烟',1);
insert into  shop_category (shop_id,category_id,name,score) value(1,19,'酒水',1);
insert into  shop_category (shop_id,category_id,name,score) value(1,16,'牛奶',1);
insert into  shop_category (shop_id,category_id,name,score) value(1,25,'火腿肠',1);
insert into  shop_category (shop_id,category_id,name,score) value(1,23,'面包',1);
insert into  shop_category (shop_id,category_id,name,score) value(1,15,'哈哈镜',1);
insert into  shop_category (shop_id,category_id,name,score) value(1,17,'速冻',1);
insert into  shop_category (shop_id,category_id,name,score) value(1,26,'日用品',1);
insert into  shop_category (shop_id,category_id,name,score) value(1,28,'火腿肠',1);

insert into  items (shop_id,name,category_id,score,count,price,price_new,pic_url) value(1,'玉米',1,10,10,1000,2000,'http://www.baidu.com');
insert into  items (shop_id,name,category_id,score,count,price,price_new,pic_url) value(1,'玉米',1,10,14,1000,2000,'http://www.baidu.com');
insert into  items (shop_id,name,category_id,score,count,price,price_new,pic_url) value(1,'玉米',1,10,14,1000,2000,'http://www.baidu.com');
insert into  items (shop_id,name,category_id,score,count,price,price_new,pic_url) value(1,'玉米',1,10,14,1000,2000,'http://www.baidu.com');
