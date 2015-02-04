package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.PushToken;
import com.renren.ntc.sg.bean.Ver;
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


@DAO(catalog = "ABC")
public interface PushTokenDAO {
    static final String TABLE_NAME= "push_token";
    static final String FIELDS = "id, ower_phone ,device_token, chn, create_time" ;
    static final String INSERT_FIELDS = "ower_phone ,device_token ,chn" ;

	@SQL("select " +  FIELDS +" from " + TABLE_NAME + " order by create_time desc limit 1")
    public PushToken getPushToken();


    @SQL("insert  into " +TABLE_NAME +" (" +  INSERT_FIELDS +") " +   " values" +
            "(:1.ower_phone,:1.device_token,:1.chn) ON DUPLICATE KEY UPDATE device_token=:1.device_token")
    public int  insertPushToken(PushToken pushtoken);


}
