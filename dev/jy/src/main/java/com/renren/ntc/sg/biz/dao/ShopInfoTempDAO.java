package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.ShopInfoTemp;
import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.SQL;
import net.paoding.rose.jade.annotation.SQLParam;

import java.util.List;

@DAO(catalog = "ABC")
public interface ShopInfoTempDAO {
    static final String FIELDS = "category_id, counts";

    @SQL("SELECT category_id ,COUNT(category_id) AS counts FROM ##(:tableName) GROUP BY (category_id)")
    public List<ShopInfoTemp> getAllShopInfoTemp(@SQLParam("tableName") String tableName);
}
