package com.renren.ntc.sg.biz.dao;

import java.util.Date;
import java.util.List;

import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;
import net.paoding.rose.jade.annotation.SQLParam;

import com.renren.ntc.sg.bean.Catstaff;

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
    static final String TABLE_NAME = "catstaff";
    static final String FIELDS = "id,name ,phone,pwd ,type,create_time,update_time ";
    static final String INSERT_FIELDS = "name ,phone,pwd,type";

    @ReturnGeneratedKeys
    @SQL("insert into " + TABLE_NAME + " (" + INSERT_FIELDS + " ) values (:1.name ,:1.phone,:1.pwd,:1.type) ")
    public long insert(Catstaff o);

    @SQL("select " + FIELDS + " from " + TABLE_NAME + " where  type=:1")
    public List<Catstaff> getCatStaffbyType(long type);

    @SQL("select " + FIELDS + " from " + TABLE_NAME + " where  id=:1")
    public Catstaff getCatStaffbyId(long id);


    @SQL("select " + FIELDS + " from " + TABLE_NAME + " where  phone=:1 and  pwd=:2")
    public Catstaff getCatStaff(String phone, String pwd);


    @SQL("update  " + TABLE_NAME + " set pwd=:2  where  phone=:1")
    public int updatePwd(String phone, String new_pwd);

    /**
     *
     * @param key
     * @param from
     * @param offset
     * @return
     */
    @SQL("select " + FIELDS + " from " + TABLE_NAME + " where  name like :1 or phone like :1 order by id asc limit :2 , :3")
    public List<Catstaff> getCatStaff(String key, int from, int offset);

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
     *
     * @param user_id
     * @return
     */
    @SQL("DELETE FROM  " + TABLE_NAME + "  WHERE id=:1")
    public int del(long user_id);
}
