package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Device;
import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-2
 * Time: 下午1:10
 * To change this template use File | Settings | File Templates.
 */
@DAO(catalog = "ABC")
public interface DeviceDAO {
    static final String TABLE_NAME= "device";
    static final String  FIELDS = "shop_id,type ,status ,token , secret_key"  ;
    @SQL("select * from " + TABLE_NAME +" where id =:1")
    public Device getDev(long pid) ;

    @SQL("select * from " + TABLE_NAME +" where shop_id =:1")
    public Device getDevByShopId(long shop_id) ;


    @SQL("select * from " + TABLE_NAME +" where token =:1")
    public Device getDev(String  token) ;

    @SQL("select * from " + TABLE_NAME )
    public List<Device> getDevs()  ;

    @SQL("update " + TABLE_NAME +" set status = :2 , update_time = now() where id =:1 ")
    public int update(long pid, String status) ;

    @SQL("update " + TABLE_NAME +" set shop_id = :1 , update_time = now() where token =:2 ")
    public int updateShop_id(long  shop_id, String token) ;

    @ReturnGeneratedKeys
    @SQL("insert into " + TABLE_NAME + "(" + FIELDS +" ) values"  + " (:1.shop_id,:1.type,:1.status,:1.token,:1.secret_key)")
    public long insert(Device o);
}
