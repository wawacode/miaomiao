package com.renren.ntc.sg.biz.dao;

import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.SQL;

import com.renren.ntc.sg.bean.Boss;

@DAO(catalog = "ABC")
public interface BossDAO {
	static final String TABLE_NAME = "boss";
	static final String FIELDS = "id,shop_id,name";
	@SQL("select "+ FIELDS +" from " + TABLE_NAME + "  where shop_id =:1")
	public Boss getBoss(long shop_id);
	
}
