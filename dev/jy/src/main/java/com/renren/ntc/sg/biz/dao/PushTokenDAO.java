package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.PushToken;
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
public interface PushTokenDAO {
    static final String TABLE_NAME= "push_token";
    static final String FIELDS = "id, owner_phone ,device_token, chn, create_time" ;
    static final String INSERT_FIELDS = "owner_phone ,device_token ,chn" ;

	@SQL("select " +  FIELDS +" from " + TABLE_NAME + " where owner_phone = :1")
    public List<PushToken> getPushToken(String owner_phone);


    @SQL("insert  into " + TABLE_NAME +" (" +  INSERT_FIELDS +") " +   " values" +
            "(:1.owner_phone,:1.device_token,:1.chn) ON DUPLICATE KEY UPDATE " +
            "owner_phone =:1.owner_phone , chn=:1.chn")
    public int  insertPushToken (PushToken pushtoken);

    @SQL(" delete from " + TABLE_NAME + " where owner_phone = :1 and  device_token=:2")
    public int  drop(String phone, String device_token);
}
