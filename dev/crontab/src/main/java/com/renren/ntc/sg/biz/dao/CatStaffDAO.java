package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.CatStaffCommit;
import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
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
public interface CatStaffDAO {
    static final String TABLE_NAME= "catstaff";
    static final String FIELDS = "id,name ,phone,pwd ,create_time,update_time " ;
    static final String INSERT_FIELDS = "name ,phone,pwd " ;

    @ReturnGeneratedKeys
    @SQL("insert into " +  TABLE_NAME+ " (" +  INSERT_FIELDS +" ) values (:1.name ,:1.phone,:1.pwd) ")
    public long insert(CatStaffCommit o);


	@SQL("select " +  FIELDS +" from " + TABLE_NAME + " id =:1 ")
	public CatStaffCommit getCatStaffCommit(long id);

}
