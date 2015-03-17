package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Community;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Ver;
import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;
import net.paoding.rose.jade.annotation.SQLParam;

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
public interface CommunityDAO {
    static final String TABLE_NAME= "community";
    static final String FIELDS = "id, name ,city ,district,address,lng,lat, create_time,update_time" ;
    static final String INSERT_FIELDS = " name ,city ,district,address,lng,lat" ;

	@SQL("select " +  FIELDS +" from " + TABLE_NAME + " limit :1,:2")
	public List<Community> get(int from ,int offset);

    @SQL("select " +  FIELDS +" from " + TABLE_NAME + " where id = :1")
    public Community get(long id );

    @ReturnGeneratedKeys
    @SQL("insert into "+ TABLE_NAME + "(" +  INSERT_FIELDS +") values(:1.name ,:1.city ,:1.district,:1.address,:1.lng,:1.lat) " )
    public int insert(Community c);



    @SQL("select "+ FIELDS +" from " + TABLE_NAME + " where name like :1 limit 10")
    public  List<Community> like( String key);

}
