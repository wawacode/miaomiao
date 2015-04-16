package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Item;
import net.paoding.rose.jade.annotation.DAO;
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

    static final String TABLE_NAME = "items";

    static final String FIELDS = "id,serialNo, shop_id,name,category_id,category_sub_id,score ,price,price_new ,count,pic_url,create_time,update_time,onsell";

    static final String INSERT_FIELDS = "serialNo,shop_id,name,category_id,category_sub_id,score, price,price_new,count,pic_url";
    
    static final String INSERT_FIELDS_BASE = "serialNo,shop_id,name,category_id,score,pic_url";
    
    static final String INSERT_FIELDS_ITEMS_BASE = "serialNo,shop_id,name,category_id,score,pic_url,count";

    /**
     * description: 获取商品数量
     * 
     * @creater llc
     * @param tableName
     * @param shop_id
     * @return
     * @date 2015-3-24 下午10:53:52
     * @editer
     */
    @SQL("select count(*) from  ##(:tableName)   where shop_id =:2 ")
    public int getItemsCount(@SQLParam("tableName") String tableName, long shop_id);

    /**
     * description: 获取商品价格为0数量
     * 
     * @creater LLC
     * @param tableName
     * @param shop_id
     * @return
     * @date 2015-3-24 下午11:00:54
     * @editer
     */
    @SQL("select count(*) from  ##(:tableName)   where shop_id =:2 and price = 0")
    public int getItemsPrice0Count(@SQLParam("tableName") String tableName, long shop_id);

    @SQL("select count(*) from  ##(:tableName)   where shop_id =:2 and price = 0 and category_id = :3")
    public int getItemsPrice0Count(@SQLParam("tableName") String tableName, long shop_id, long category_id);

    /**
     * description: 分类数量
     * 
     * @creater LQ
     * @param tableName
     * @param shop_id
     * @param category_id
     * @return
     * @date 2015-3-24 下午11:38:29
     * @editer
     */
    @SQL("select count(*) from  ##(:tableName)   where shop_id =:2 and category_id = :3")
    public int getItemsCategoryCount(@SQLParam("tableName") String tableName, long shop_id, long category_id);

    @SQL("select " + FIELDS + " from  ##(:tableName)   where shop_id =:2  limit :3,:4")
    public List<Item> getItems(@SQLParam("tableName") String tableName, long shop_id, int from, int offset);

    @SQL("select " + FIELDS + " from  ##(:tableName)   where shop_id =:2 and  category_id =::3  limit :4,:5")
    public List<Item> getItems(@SQLParam("tableName") String tableName, long shop_id, long category_id, int from, int offset);

    @SQL("select " + FIELDS + " from ##(:tableName)   where shop_id=:3 and serialNo =:2")
    public Item getItem(@SQLParam("tableName") String tableName, String serialNo, long to_shop_id);

    @SQL("select " + FIELDS + " from ##(:tableName)   where id =:3")
    public Item getItem(@SQLParam("tableName") String tableName, long shop_id, long id);

    @SQL("select " + FIELDS + " from ##(:tableName)   where shop_id =:2 and category_id=:3 order by score asc limit :4 , :5")
    public List<Item> getItems(@SQLParam("tableName") String tableName, long shop_id, int category_id, int from, int offset);

    @SQL("update ##(:tableName)  set count = count-:4  where id =:3")
    public void insert(@SQLParam("tableName") String tableName, long s_id, long i_id, int count);

    @SQL("update  ##(:tableName) set count = count-:4  where id =:3")
    public void decr(@SQLParam("tableName") String tableName, long s_id, long i_id, int count);

    @SQL("insert into ##(:tableName) (" + INSERT_FIELDS + ")" + " value (:2.serialNo,:2.shop_id,:2.name,"
            + ":2.category_id,:2.category_sub_id,:2.score,:2.price,:2.price_new,:2.count,:2.pic_url)")
    public int insert(@SQLParam("tableName") String tableName, Item item);

    @SQL("select " + FIELDS + " from ##(:tableName)  where  shop_id=:2  order by score  desc limit :3,:4")
    public List<Item> hot(@SQLParam("tableName") String tableName, long shop_id, int flag, int offset);

    @SQL("select " + FIELDS + " from  ##(:tableName)   where  shop_id=:2 and name like :3")
    public List<Item> search(@SQLParam("tableName") String tableName, long shop_id, String key);

    @SQL("update  ##(:tableName) set ##(:key) = :4  where id =:2")
    public int update(@SQLParam("tableName") String tableName, long id, @SQLParam("key") String key, String value);

    @SQL("update  ##(:tableName) set ##(:key) = :4  where serialNo =:2")
    public int update(@SQLParam("tableName") String tableName, String serialNo, @SQLParam("key") String key, long value);

    @SQL("update  ##(:tableName) set name = :3 , pic_url=:4  where serialNo =:2")
    public int update(@SQLParam("tableName") String tableName, String serialNo, String name, String pic_url);

    @SQL("update  ##(:tableName) set pic_url=:2 where serialNo =:3")
    public int updateforSerialNo(@SQLParam("tableName") String tableName, String key, String value);

    @SQL("update  ##(:tableName) set pic_url=:2.pic_url,name=:2.name,category_id=:2.category_id,price=:2.price,score=:2.score,shop_id=:2.shop_id where serialNo =:3")
    public int updateforSerialNo(@SQLParam("tableName") String tableName, Item items, String serialNo);

    @SQL("update  ##(:tableName) set name=:2 where serialNo =:3")
    public int updateNameforSerialNo(@SQLParam("tableName") String tableName, String name, String serialNo);

    @SQL("delete from ##(:tableName) where  shop_id =:2")
    public void del(@SQLParam("tableName") String tableName, long del_shop_id);

    /**
     * description: 删除价格为0商品
     * 
     * @creater LLC
     * @param tableName
     * @param del_shop_id
     * @date 2015-3-24 下午11:00:06
     * @editer
     */
    @SQL("delete from ##(:tableName) where  shop_id =:2 and price = 0")
    public void delPrice0(@SQLParam("tableName") String tableName, long del_shop_id);

    @SQL("delete from ##(:tableName) where  shop_id =:2 and category_id = :3")
    public void delCategory(@SQLParam("tableName") String tableName, long del_shop_id, long category_id);

    @SQL("delete from ##(:tableName) where  shop_id =:2 and serialNo=:3")
    public void del(@SQLParam("tableName") String tableName, long del_shop_id, String serialNo);

    @SQL("update  ##(:tableName) set price=:3 where shop_id=:4 and serialNo =:2")
    void updatePrice(@SQLParam("tableName") String tableName, String serialNo, int price, long shop_id);
    
    @SQL("insert into ##(:tableName) (" + INSERT_FIELDS_BASE + ")" + " value (:2.serialNo,:2.shop_id,:2.name,"
            + ":2.category_id,:2.score,:2.pic_url)")
    public int insertBaseInfo(@SQLParam("tableName") String tableName, Item item);
    
    @SQL("select serialNo from  ##(:tableName) where shop_id = :2  group by serialNo having(count(serialNo) > 1)")
    public List<String> getDupSerialList(@SQLParam("tableName") String tableName, long shopId);
    
    @SQL("select " + FIELDS + " from ##(:tableName)   where shop_id=:3 and serialNo =:2 order by create_time desc")
    public List<Item> getItemList(@SQLParam("tableName") String tableName, String serialNo, long to_shop_id);

    @SQL("delete from ##(:tableName) where  shop_id =:2 and id=:3")
    public void delById(@SQLParam("tableName") String tableName, long del_shop_id, long id);
    
    @SQL("update  ##(:tableName) set name = :3 , pic_url=:4 , price=:5,count=:6 where serialNo =:2")
    public int updateBaseInfo(@SQLParam("tableName") String tableName, String serialNo, String name, String pic_url,int price,int count);
    
    @SQL("select " + FIELDS + " from  ##(:tableName)   where shop_id =:2 order by create_time desc limit :3,:4")
    public List<Item> getOrignItems(@SQLParam("tableName") String tableName, long shop_id, int from, int offset);
    
    @SQL("insert into ##(:tableName) (" + INSERT_FIELDS_ITEMS_BASE + ")" + " value (:2.serialNo,:2.shop_id,:2.name,"
            + ":2.category_id,:2.score,:2.pic_url,:2.count)")
    public int insertItemsBaseInfo(@SQLParam("tableName") String tableName, Item item);
    
    @SQL("update  ##(:tableName) set name = :3 , pic_url=:4 , price=:5,count=:6,category_id=:7 where serialNo =:2")
    public int updateItemsBaseInfo(@SQLParam("tableName") String tableName, String serialNo, String name, String pic_url,int price,int count,int cateId);
}
