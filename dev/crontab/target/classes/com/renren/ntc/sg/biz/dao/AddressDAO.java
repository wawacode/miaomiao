package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Address;
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
public interface AddressDAO {
    static final String TABLE_NAME= "address";
    static final String FIELDS = "id,type,user_id,city,province ,district,phone,address,create_time,update_time" ;
    static final String INSERT_FIELDS = "type,user_id,city,province ,district,phone,address,update_time" ;

    @SQL("select "+ FIELDS +" from " + TABLE_NAME + "  where id =:1")
    public Address getAddress(long id);

	@SQL("select "+ FIELDS +" from " + TABLE_NAME + "  where user_id =:1 order by type desc  limit :2,:3")
	public List<Address> getAddresses(long user_id, int start, int offset);

    @ReturnGeneratedKeys
    @SQL("insert into  "  + TABLE_NAME + "(" + INSERT_FIELDS  +") values (:1.type,:1.user_id,:1.city,:1.province,:1.district,:1.phone,:1.address,:1.update_time)")
    public int  addAddress(Address address);

    @SQL("update  "  + TABLE_NAME +  " set city=:1.city,name= :1.name,phone =:1.phone, address = :1.address ,update_time=:1.update_time" + " where id = :1.id")
    public int  updateAddress(Address address);

    @SQL("del  "  + TABLE_NAME + " where id = :1.id")
    public int  delAddress(long address_id);

    @SQL("update  "  + TABLE_NAME +  " set type=1 where id = :1")
    public int defaultAddress(long address_id);

    @SQL("update  "  + TABLE_NAME +  " set type = 0 where user_id = :1")
    public int cleanDefaultAddress(long user_id);

}
