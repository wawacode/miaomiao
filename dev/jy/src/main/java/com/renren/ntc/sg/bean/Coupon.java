package com.renren.ntc.sg.bean;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-10-15
 * Time: 下午2:13
 * To change this template use File | Settings | File Templates.
*/
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

public class Coupon {

    private  long id = 0;
<<<<<<< HEAD
    private long price = 0 ;
    private  long  createer  = 0;
    private String name;
    private String  desc;
=======
    private  int price = 0 ;
    private  long  createer  = 0;
    private String name;
    private String  desc;
    private String pic_url;
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
    private String   ext;
    private Date start_time ;
    private Date end_time ;
    private Date create_time;
    private Date update_time;
<<<<<<< HEAD


=======
    private String startTimeStr;
    private String endTimeStr;


    private long shop_id = 0;

    public String getPic_url() {
        return pic_url;
    }

    public void setPic_url(String pic_url) {
        this.pic_url = pic_url;
    }
    public long getShop_id() {
        return shop_id;
    }

    public void setShop_id(long shop_id) {
        this.shop_id = shop_id;
    }

>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

<<<<<<< HEAD
    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
=======
    public int getPrice() {
        return price;
    }

    public void setPrice( int price) {
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
        this.price = price;
    }

    public long getCreateer() {
        return createer;
    }

    public void setCreateer(long createer) {
        this.createer = createer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }

    public Date getStart_time() {
        return start_time;
    }

    public void setStart_time(Date start_time) {
        this.start_time = start_time;
    }

    public Date getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Date end_time) {
        this.end_time = end_time;
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
<<<<<<< HEAD

    public void setUpdate_time(Date update_time) {
        this.update_time = update_time;
    }

=======
    
    public Coupon(){
    	
    }

    public Coupon(long shopId,int price, long createer, String name, String ext,
			String pic_url, String start_time, String end_time) {
		super();
		this.shop_id = shopId;
		this.price = price;
		this.createer = createer;
		this.name = name;
		this.ext = ext;
		this.pic_url = pic_url;
		this.startTimeStr = start_time;
		this.endTimeStr = end_time;
	}

	public void setUpdate_time(Date update_time) {
        this.update_time = update_time;
    }

	public String getStartTimeStr() {
		return startTimeStr;
	}

	public void setStartTimeStr(String startTimeStr) {
		this.startTimeStr = startTimeStr;
	}

	public String getEndTimeStr() {
		return endTimeStr;
	}

	public void setEndTimeStr(String endTimeStr) {
		this.endTimeStr = endTimeStr;
	}

>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77



}
