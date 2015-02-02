package com.qunar.quzilla.dao;

import java.util.List;

import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;

import com.qunar.quzilla.pojo.Count;
import com.qunar.quzilla.pojo.SDoc;

/**
 * User: yunming.zhu
 * Date: 13-9-23
 * Time: 下午6:09
 */
@DAO
public interface SuggestionDAO {
    static final  String   FIELDS = "id,`word` ";
    @SQL("select " + FIELDS + " from s_suggestion where shop_id=:1 and audit = 0  order by `score` desc ")
    List<SDoc> getDoc(long shop_id);
    
    @SQL("select " +FIELDS + " from s_suggestion where shop_id=:3 and audit = 0  order by `score` desc limit :1,:2 ")
    List<SDoc> getDoc(int offset , int count,long shop_id);

    @SQL("select count(id) as count from s_suggestion  where audit = 0 and shop_id=:1")
	Count getCount(long shop_id);
    
    @ReturnGeneratedKeys
    @SQL("insert    into s_suggestion  (word,score,shop_id) values(:1,:2,:3)")
    int add(String key, int o,long shop_id);

}
