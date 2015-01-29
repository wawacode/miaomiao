package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.ShopCategory;
import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.SQL;

import java.util.List;

@DAO(catalog = "ABC")
public interface ShopCategoryDAO {
    static final String TABLE_NAME= "shop_category";
    static final String FIELDS = "id, shop_id,name,category_id,category_sub_id,score" ;
    static final String INSERT_FIELDS = "shop_id,name,category_id,category_sub_id,score" ;

	@SQL("select " +FIELDS  + "  from "  + TABLE_NAME + " where  shop_id =:1 order by score desc  ")
	public List<ShopCategory> getCategory(long shop_id);
	
	
	@SQL("insert into " + TABLE_NAME + "(" + INSERT_FIELDS +" ) values"  + " (:1.shop_id,:1.category_id,:1.category_sub_id,:1.score)")
	public int insert(ShopCategory o);
	
	
}
