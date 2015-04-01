package com.renren.ntc.sg.bean;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-10-15
 * Time: 下午2:13
 * To change this template use File | Settings | File Templates.
*/

public class UserCoupon {

    //id ,user_id,coupon_id,price,code,ext,start_time,end_time,create_time,update_time
    private  long id = 0;
    private long user_id = 0 ;
<<<<<<< HEAD
    private  long  coupon_id  = 0;
    private  long price = 0 ;
=======



    private long shop_id = 0;
    private  long  coupon_id  = 0;
    private  int price = 0 ;

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
    private String pic_url = "";


    private int  status = 0;
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
    private String code;
    private String  name ;
    private String  desc ;
    private String   ext;
    private Date start_time ;
    private Date end_time ;;
    private Date update_time;
    private Date create_time ;

    public long getId() {
        return id;
    }

<<<<<<< HEAD
=======

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
    public void setId(long id) {
        this.id = id;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public long getCoupon_id() {
        return coupon_id;
    }

    public void setCoupon_id(long coupon_id) {
        this.coupon_id = coupon_id;
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

    public void setPrice(int price) {
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
        this.price = price;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public Date getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(Date update_time) {
        this.update_time = update_time;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }





}
