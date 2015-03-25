package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Community;
import com.renren.ntc.sg.bean.Shop_Community;
import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;

import java.util.List;

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


@DAO(catalog = "ABC")
public interface Shop_CommunityDAO {
    static final String TABLE_NAME= "shop_community";
    static final String FIELDS = "id, shop_id ,community_id ,ext, create_time,update_time" ;
    static final String INSERT_FIELDS = "shop_id ,community_id ,ext" ;

	@SQL("select shop_id  from " + TABLE_NAME + " where community_id = :1")
	public List<Long> get(long community_id);

    @ReturnGeneratedKeys
    @SQL("insert into "+ TABLE_NAME + "(" +  INSERT_FIELDS +") values(:1.shop_id ,:1.community_id ,:1.ext) " )
    public int insert(Shop_Community c);

    @SQL("delete from "+ TABLE_NAME + " where shop_id=:1 and community_id=:2 " )
    public void del(long shop_id, long c_id);


    @SQL("select community_id  from " + TABLE_NAME + " where  shop_id = :1")
    public List<Long> getCmmy(long shop_id);
}
