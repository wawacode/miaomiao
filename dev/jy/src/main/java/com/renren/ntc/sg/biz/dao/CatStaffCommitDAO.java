package com.renren.ntc.sg.biz.dao;

import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;
import net.paoding.rose.jade.annotation.SQLParam;

import java.util.Date;
import java.util.List;

import com.renren.ntc.sg.bean.CatStaffCommit;

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
public interface CatStaffCommitDAO {
    static final String TABLE_NAME = "catstaff_commit";
    static final String FIELDS = "id,name ,phone,pwd ,shop_id,shop_info,shop_serveArea," +
            "shop_name,shop_owner_phone,shop_address,shop_tel,shop_print,shop_lat,shop_lng,create_time,update_time ,serialNo_num, success_num";
    static final String INSERT_FIELDS = "name ,phone,pwd ,shop_serveArea,shop_name," +
            "shop_owner_phone,shop_address,shop_tel,shop_print,shop_lat,shop_lng,serialNo_num, success_num";

    @ReturnGeneratedKeys
    @SQL("insert into " + TABLE_NAME + " (" + INSERT_FIELDS + " ) values (:1.name ,:1.phone,:1.pwd ," +
            ":1.shop_serveArea,:1.shop_name,:1.shop_owner_phone,:1.shop_address,:1.shop_tel," +
            ":1.shop_print,:1.shop_lat,:1.shop_lng) ")
    public long insert(CatStaffCommit o);


    @SQL("select " + FIELDS + " from " + TABLE_NAME + " where  id =:1 ")
    public CatStaffCommit getCatStaffCommit(long id);


    @SQL("select " + FIELDS + " from " + TABLE_NAME + " where phone =:1 and pwd = :2 order by create_time desc limit :3,:4")
    public List<CatStaffCommit> getCatStaffCommit(String staff_phone, String staff_pwd, int from, int offset);


    @SQL("update " + TABLE_NAME + " set shop_info =:3 ,shop_id= :2  where id = :1")
    public int update(long id, long shop_id, String shop_info);

    @SQL("select " + FIELDS + " from " + TABLE_NAME + " where  shop_id =:1 ")
    public List<CatStaffCommit> getbyShopid(long shop_id);


    @SQL("select shop_id from " + TABLE_NAME + " where  phone =:1 ")
    public List<Long> getShop_ids(String phone);

    /**
     * @param key
     * @param from
     * @param offset
     * @return
     */
    @SQL("select " + FIELDS + " from " + TABLE_NAME + " where  name like :1 or phone like :1 or shop_name like :1 or shop_address like :1 order by id asc limit :2 , :3")
    public List<CatStaffCommit> getCatStaffCommit(String key, int from, int offset);

    /**
     * @param key
     * @param value
     * @param date
     * @param id
     * @return
     */
    @SQL("update " + TABLE_NAME + " set ##(:key) = :2, update_time = :3 where id =:4")
    public int update(@SQLParam("key") String key, String value, Date date, long id);

    /**
     * @param serialNoNum
     * @param successNum
     * @param shop_id
     * @return
     */
    @SQL("update " + TABLE_NAME + " set serialNo_num = :2, success_num = :3 where shop_id =:1")
    public int update(long shop_id, int serialNoNum, int successNum);

    /**
     * @param user_id
     * @return
     */
    @SQL("DELETE FROM  " + TABLE_NAME + "  WHERE id=:1")
    public int del(long user_id);

    @SQL("select " + FIELDS + " from " + TABLE_NAME + " where  shop_id =:1 ")
    public CatStaffCommit getbyShopId(long shop_id);
}
