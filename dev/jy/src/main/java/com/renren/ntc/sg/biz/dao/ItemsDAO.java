package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Item;

import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;
import net.paoding.rose.jade.annotation.SQLParam;

import java.util.List;

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
public interface ItemsDAO {
    static final String TABLE_NAME= "items";
    static final String FIELDS = "id,serialNo, shop_id,name,category_id,category_sub_id,score ,price,price_new ,count,pic_url,create_time,update_time,onsell" ;
    static final String INSERT_FIELDS = "serialNo,shop_id,name,category_id,category_sub_id,score, price,price_new,count,pic_url,onsell" ;

    @SQL("select "+ FIELDS +" from  ##(:tableName)   where shop_id =:2  limit :3,:4")
    public List<Item> getItems(@SQLParam("tableName") String tableName,long shop_id,int from,int offset);

    @SQL("select "+ FIELDS +" from ##(:tableName)   where serialNo =:2")
    public  Item getItem(@SQLParam("tableName") String tableName,String  serialNo);


    @SQL("select "+ FIELDS +" from ##(:tableName)   where id =:3")
    public  Item getItem(@SQLParam("tableName") String tableName, long shop_id, long id);

    @SQL("select "+ FIELDS +" from ##(:tableName)   where shop_id =:2 and category_id=:3 and count >0 and onsell=1 order by score desc limit :4 , :5")
    public List<Item> getItems(@SQLParam("tableName") String tableName, long shop_id, int category_id, int from, int offset);

    @SQL("select "+ FIELDS +" from ##(:tableName)   where shop_id =:2 and category_id=:3 order by score desc limit :4 , :5")
    public List<Item> getItemsWithZero(@SQLParam("tableName") String tableName, long shop_id, int category_id, int from, int offset);

    @SQL("update ##(:tableName)  set count = count-:4  where id =:3")
    public void insert(@SQLParam("tableName") String tableName, long s_id, long i_id, int count);

    @SQL("update  ##(:tableName) set count = count-:4  where id =:3")
    public void decr(@SQLParam("tableName") String tableName, long s_id, long i_id, int count);
    @ReturnGeneratedKeys
    @SQL("insert into ##(:tableName) (" + INSERT_FIELDS + ")" +" value (:2.serialNo,:2.shop_id,:2.name," +
            ":2.category_id,:2.category_sub_id,:2.score,:2.price,:2.price_new,:2.count,:2.pic_url,:2.onsell)")
    public  int insert(@SQLParam("tableName") String tableName, Item item);

    @SQL("select "+ FIELDS +" from ##(:tableName)  where  shop_id=:2  order by score  desc limit :3,:4")
    public  List<Item> hot(@SQLParam("tableName") String tableName, long shop_id, int flag, int offset);


    @SQL("select "+ FIELDS +" from  ##(:tableName)   where count > 0 and onsell= 1 and shop_id=:2 and name like :3 limit 0 , 20")
    public  List<Item> search(@SQLParam("tableName") String tableName, long shop_id, String key);


    @SQL("update  ##(:tableName) set ##(:key) = :4  where id =:2")
    public int update(@SQLParam("tableName") String tableName, long id, @SQLParam("key") String key, String value);

    @SQL("update  ##(:tableName) set ##(:key) = :4  where id =:2")
    public int update(@SQLParam("tableName") String tableName, long id, @SQLParam("key") String key, long value);

    @SQL("update  ##(:tableName) set ##(:key) = :4  where serialNo =:2")
    public int update(@SQLParam("tableName") String tableName, String serialNo, @SQLParam("key") String key, long value);

    @SQL("update  ##(:tableName) set pic_url=:2 where serialNo =:3")
    public  int updateforSerialNo(@SQLParam("tableName") String tableName,String key, String value);

    @SQL("delete from ##(:tableName) where shop_id =:2")
    void del(@SQLParam("tableName") String tableName, long shop_id);
    
    @SQL("delete from ##(:tableName) where id =:2")
    public int delItemsById(@SQLParam("tableName") String tableName, long itemId);
    
    @SQL("select "+ FIELDS +" from  ##(:tableName)   where  shop_id=:2 and (name like :3 or serialNo like :3) order by id  limit 0 , 20")
    public  List<Item> indistinctSearch(@SQLParam("tableName") String tableName, long shop_id, String key);
    
    @SQL("select "+ FIELDS +" from  ##(:tableName)   where  shop_id=:2  order by id limit 0 , 20")
    public  List<Item> search(@SQLParam("tableName") String tableName, long shop_id);
    
    @SQL("update  ##(:tableName) set pic_url=:2 where id =:3")
    public  int updateByItemId(@SQLParam("tableName") String tableName,String picUrl, long id);

    @SQL("update  ##(:tableName) set serialNo=:2,name=:3,category_id=:4,score=:5,count=:6,price=:7,update_time=now(),pic_url=:9 where id =:8")
    public  int updateItemById(@SQLParam("tableName") String tableName,String serialNo, String name,int category_id,int score,int count,int price,long id,String picUrl);
    
    @SQL("update  ##(:tableName) set serialNo=:2,name=:3,category_id=:4,score=:5,count=:6,price=:7,update_time=now() where id =:8")
    public  int updateItemById(@SQLParam("tableName") String tableName,String serialNo, String name,int category_id,int score,int count,int price,long id);
    
    @SQL("select count(1) from ##(:tableName)   where shop_id =:2")
    public int getCountOfItemByShopId(@SQLParam("tableName") String tableName, long shop_id);
    
    @SQL("select max(score) from ##(:tableName)   where category_id =:2")
    public int getMaxScoreOfItem(@SQLParam("tableName") String tableName,int catId);
    
    @SQL("update ##(:tableName) set  score=:3 where id =:2")
    public int stickyItemByCondition(@SQLParam("tableName") String tableName,long itemId,int score);
    
    @SQL("select "+ FIELDS +" from ##(:tableName) where shop_id =:2 and onsell = 0")
    public List<Item> showNoSaleItems(@SQLParam("tableName") String tableName,long shopId);
    
    @SQL("update  ##(:tableName) set serialNo=:2,name=:3,category_id=:4,score=:5,count=:6,price=:7,update_time=now(),onsell = :9 where id =:8")
    public  int updateItemById(@SQLParam("tableName") String tableName,String serialNo, String name,int category_id,int score,int count,int price,long id,int onsell);

    @SQL("update ##(:tableName) set  onsell=:3 where id =:2")
    public int updateSaleStatus(@SQLParam("tableName") String tableName,long itemId,int onsell);

    @SQL("update ##(:tableName) set  pic_url=:3 where id =:2")
    public int updateItemPriceById(@SQLParam("tableName") String tableName,long itemId,String pic_url);
    
    /**
     * zhaoxiufei
     * @param tableName
     * @param to_shop_id
     * @param serialNo
     * @return
     */
    @SQL("select " + FIELDS + " from ##(:tableName)   where shop_id=:2 and serialNo =:3")
    public Item getItem(@SQLParam("tableName") String tableName, long to_shop_id, String serialNo);
    
    /**
     * zhaoxiufei
     * @param tableName
     * @param items
     * @param serialNo
     * @return
     */
    @SQL("update  ##(:tableName) set pic_url=:2.pic_url,name=:2.name,category_id=:2.category_id,price=:2.price,score=:2.score,shop_id=:2.shop_id where serialNo =:3")
    public int updateforSerialNo(@SQLParam("tableName") String tableName, Item items, String serialNo);
  
    /**
     * zhaoxiufei
     * @param tableName
     * @param del_shop_id
     * @param serialNo
     */
    @SQL("delete from ##(:tableName) where  shop_id =:2 and serialNo=:3")
    public void del(@SQLParam("tableName") String tableName, long del_shop_id, String serialNo);
    
    /**
     * 
     * @param generTableName
     * @param shop_id
     * @return
     */
    @SQL("SELECT DISTINCT(category_id) from ##(:tableName)")
	public List<Item> getCategoriesByShopId(@SQLParam("tableName") String generTableName);

}
