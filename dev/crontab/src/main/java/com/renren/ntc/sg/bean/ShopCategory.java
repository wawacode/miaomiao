package com.renren.ntc.sg.bean;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-8
 * Time: 上午11:15
 * To change this template use File | Settings | File Templates.
 */
public class ShopCategory {

    private long id;
    private long  shop_id ;


    private String  name;
    private int   category_id;
    private int  category_sub_id ;

    private int  score;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getShop_id() {
        return shop_id;
    }

    public void setShop_id(long shop_id) {
        this.shop_id = shop_id;
    }

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public int getCategory_sub_id() {
        return category_sub_id;
    }

    public void setCategory_sub_id(int category_sub_id) {
        this.category_sub_id = category_sub_id;
    }



    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;


    }

}
