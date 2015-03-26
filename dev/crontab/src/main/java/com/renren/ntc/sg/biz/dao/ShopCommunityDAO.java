package com.renren.ntc.sg.biz.dao;

import java.util.List;

import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.SQL;

/*
CREATE TABLE `items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT ,
  `shop_id` bigint(20) NOT NULL DEFAULT 0 ,
  `name` varchar(24) NOT NULL DEFAULT '' ,
  `count` int(11) NOT NULL DEFAULT 0 ,
  `head_url` varchar(256) NOT NULL DEFAULT '' ,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   KEY shop_id(`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


 */

/**
 * @className ShopCommunityDAO
 * @description 获取绑定小区ID
 * @author LQ
 * @date 2015-3-24 下午11:26:35
 */
@DAO(catalog = "ABC")
public interface ShopCommunityDAO {

    static final String TABLE_NAME = "shop_community";

    @SQL("select community_id from " + TABLE_NAME + " where shop_id = :1")
    public List<String> getCommunityId(int shop_id);

    @SQL("select distinct community_id from " + TABLE_NAME)
    public List<String> getAllCommunityId();

}
