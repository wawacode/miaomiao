package com.renren.ntc.sg.bean;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-8
 * Time: 下午1:50
 * To change this template use File | Settings | File Templates.
 */
public class Product {

    private long id;
    private String   serialNo;

    private String    name  ;

    private String     pic_url ;
    private int  category_id      ;
    private int  category_sub_id;

    private Date create_time ;
    private Date update_time  ;
    
    private int  count  = 0;
    private  int  price;
    private int  score;
    
    public Product(){
    	
    }
    
    public Product(String serialNo,String name,String picUrl,int categoryId,int score,int price){
    	this.serialNo = serialNo;
    	this.name = name;
    	this.pic_url = picUrl;
    	this.category_id = categoryId;
    	this.score = score;
    	this.price = price;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public Date getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(Date update_time) {
        this.update_time = update_time;
    }





    public String getPic_url() {
        return pic_url;
    }

    public void setPic_url(String pic_url) {
        this.pic_url = pic_url;
    }



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSerialNo() {
        return serialNo;
    }

    public void setSerialNo(String serialNo) {
        this.serialNo = serialNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}


}
