package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Order;
import net.paoding.rose.jade.annotation.DAO;
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
public interface UserOrdersDAO {
    static final String FIELDS = "id, order_id,readed,shop_id,user_id,address_id,remarks ,info ,snapshot,status,price,create_time,update_time" ;
    static final String INSERT_FIELDS = " order_id,readed,shop_id,user_id,address_id,remarks ,info,snapshot,status,price" ;

	@SQL("select "+ FIELDS +" from ##(:tableName)   where user_id =:1 order by create_time desc limit :2,:3")
	public List<Order> getOrder(long user_id, int start, int offset, @SQLParam("tableName") String tableName);


    @SQL("select "+ FIELDS +" from ##(:tableName)   where shop_id =:1 order by create_time desc limit :2,:3")
    public List<Order> getOrderByShop(long shop_id, int start, int offset, @SQLParam("tableName") String tableName);


    @SQL("insert into  ##(:tableName) (" + INSERT_FIELDS + ") values(:1.order_id,:1.readed,:1.shop_id," +
            ":1.user_id,:1.address_id,:1.remarks,:1.info,:1.snapshot,:1.status,:1.price)  ")
    public int  insertUpdate(Order o, @SQLParam("tableName") String tableName);

    @SQL("select "+ FIELDS +" from ##(:tableName)  where shop_id =:1 and status = 1 ")
    public List<Order> getOrder2Print(long shop_id, @SQLParam("tableName") String tableName);

    @SQL("select "+ FIELDS +" from ##(:tableName)  where shop_id =:1 order by create_time desc limit :2,:3 ")
    List<Order> get10Orders(long shop_id, int from, int offset, @SQLParam("tableName") String tableName);

    @SQL("select "+ FIELDS +" from ##(:tableName)  order by create_time desc limit 0,100 ")
    List<Order> get10Orders(@SQLParam("tableName") String tableName);

    @SQL("update ##(:tableName)   set status=:1 where order_id = :2 ")
    int update(int i, String orderId, @SQLParam("tableName") String tableName);

    @SQL("select "+ FIELDS +" from ##(:tableName)  where order_id =:1 ")
    public Order getOrder(String orderId, @SQLParam("tableName") String tableName);
    
    @SQL("select "+ FIELDS +" from ##(:tableName)  where create_time between :1 and :2")
    public List<Order> getOrder(String beginTime, String endTime, @SQLParam("tableName") String tableName);

    @SQL("update ##(:tableName)   set readed=1 where order_id=:2")
    public int  read(@SQLParam("tableName") String tableName, String order_id);
}
