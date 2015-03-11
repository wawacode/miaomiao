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
public interface StorageDAO {
    static final String TABLE_NAME= "storage";
    static final String  FIELDS = "user_id,shop_id"  ;
    @SQL("select shop_id  from " + TABLE_NAME +" where user_id =:1")
    public long getShop(long user_id) ;


    @ReturnGeneratedKeys
    @SQL("insert into " + TABLE_NAME + "(" + FIELDS +" ) values"  + " (:1,:2) on duplicate key update shop_id =:2")
    public void insertAndUpdate(long user_id,long shop_id);
}
