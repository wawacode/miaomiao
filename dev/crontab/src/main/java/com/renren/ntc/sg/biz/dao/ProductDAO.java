package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.SQL;
import net.paoding.rose.jade.annotation.SQLParam;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-23
 * Time: 上午10:21
 * To change this template use File | Settings | File Templates.
 */
@DAO(catalog = "ABC")
public interface ProductDAO {

    static final String TABLE_NAME= "product";
    static final String FIELDS = "id, serialNo,name,price,score,pic_url,category_id,category_sub_id ,create_time ,update_time" ;
    static final String INSERT_FIELDS = "serialNo,name,price,score,pic_url,category_id,category_sub_id " ;
    static final String INSERT_FIELDS_BASE = "serialNo,name,score,pic_url,category_id" ;

    @SQL("select "+ FIELDS +" from " + TABLE_NAME + " where category_id=:1 limit :2,:3 ")
    public List<Product> geProducts(long category_id ,int from ,int offset );


    @SQL("select "+ FIELDS +" from " + TABLE_NAME + " where name like :1 ")
    public List<Product> geProducts(String query );

    @SQL("select "+ FIELDS +" from " + TABLE_NAME + " where serialNo= :1 ")
    public Product geProductsByserialNo(String serialNo );

    @SQL("select "+ FIELDS +" from " + TABLE_NAME + "  limit :1,:2 ")
    public List<Product> geProducts(int from ,int offset );


    @SQL("insert into  " + TABLE_NAME  + " (" + INSERT_FIELDS + ")" +" value (:1.serialNo,:1.name,:1.price," +
            ":1.score,:1.pic_url,:1.category_id,:1.category_sub_id)")
    public  int insert(Product product);



    @SQL("update " + TABLE_NAME + "  set pic_url=:1 where serialNo = :2 ")
    public int update(String url, String serialNo);




    @SQL("update " + TABLE_NAME + "  set pic_url=:1.pic_url , name=:1.name," +
            "score=:1.score,category_id=:1.category_id  where serialNo = :2 ")
    public int update(Product p, String serialNo);

    @SQL("update " + TABLE_NAME + "  set name=:1 where serialNo = :2 ")
    public int updateName(String name, String serialNo);
    
    @SQL("update " + TABLE_NAME + "  set pic_url=:1.pic_url , name=:1.name," +
            "score=:1.score,category_id=:1.category_id,price=:1.price  where serialNo = :2 ")
    public int updateInfo(Product p, String serialNo);
    
    @SQL("update " + TABLE_NAME + "  set pic_url=:1.pic_url , name=:1.name," +
            "category_id=:1.category_id  where serialNo = :2 ")
    public int updateBaseInfo(Product p, String serialNo);
    
    @SQL("insert into  " + TABLE_NAME  + " (" + INSERT_FIELDS_BASE + ")" +" value (:1.serialNo,:1.name," +
            ":1.score,:1.pic_url,:1.category_id)")
    public  int insertBaseInfo(Product product);
}
