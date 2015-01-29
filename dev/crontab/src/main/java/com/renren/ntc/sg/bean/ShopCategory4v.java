package com.renren.ntc.sg.bean;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-8
 * Time: 下午12:25
 * To change this template use File | Settings | File Templates.
 */
public class ShopCategory4v {
    private long  id  ;              //这个自增序号，
    private int   type  ;
    private String name;

    private int   category_id;     //分类id

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

    private int   category_sub_id ;

    public List<Item> getItemls() {
        return itemls;
    }

    public void setItemls(List<Item> itemls) {
        this.itemls = itemls;
    }

    private List<Item> itemls ;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
