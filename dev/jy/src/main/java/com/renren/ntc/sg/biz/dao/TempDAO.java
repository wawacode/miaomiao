package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Ver;
import net.paoding.rose.jade.annotation.DAO;
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
public interface TempDAO {
    static final String TABLE_NAME= "temp";
    static final String FIELDS = "id, phone ,status, create_time,update_time" ;
    static final String INSERT_FIELDS = "phone " ;

	@SQL("select  phone from " + TABLE_NAME + " limit :1,:2")
	public List<String> getPhone(int from ,int offset);


    @SQL("insert into " +TABLE_NAME + "( " + INSERT_FIELDS + ") value (:1)" )
    public int insert( String phone);


}
