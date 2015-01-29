package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Category;
import net.paoding.rose.jade.annotation.DAO;
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
public interface CategoryDAO {
    static final String TABLE_NAME= "category";

    @SQL("select * from " + TABLE_NAME +" where id =:1")
    public List <Category> categorys(long pid) ;

    @SQL("select * from " + TABLE_NAME )
    public List<Category> getCategory()  ;



}
