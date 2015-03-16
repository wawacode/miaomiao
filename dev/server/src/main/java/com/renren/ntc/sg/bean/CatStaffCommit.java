package com.renren.ntc.sg.bean;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 15-1-9
 * Time: 下午5:37
 * To change this template use File | Settings | File Templates.
 */
public class CatStaffCommit {

    private long  id;
    private String  name;
    private String  phone;
    private String pwd;
    private String shop_name;



    private String shop_serveArea ;
    private String shop_owner_phone;
    private String shop_tel;



    private long  shop_id;
    private String shop_print;

    private String shop_address;
    private double  shop_lat;
    private double  shop_lng;



    private String shop_info;
    private Date create_time ;
    private Date update_time ;

    public String getShop_serveArea() {
        return shop_serveArea;
    }

    public void setShop_serveArea(String shop_serveArea) {
        this.shop_serveArea = shop_serveArea;
    }
    public long getShop_id() {
        return shop_id;
    }

    public void setShop_id(long shop_id) {
        this.shop_id = shop_id;
    }

    public String getShop_info() {
        return shop_info;
    }

    public void setShop_info(String shop_info) {
        this.shop_info = shop_info;
    }

    public String getShop_owner_phone() {
        return shop_owner_phone;
    }

    public void setShop_owner_phone(String shop_owner_phone) {
        this.shop_owner_phone = shop_owner_phone;
    }

    public String getShop_address() {
        return shop_address;
    }

    public void setShop_address(String shop_address) {
        this.shop_address = shop_address;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getShop_name() {
        return shop_name;
    }

    public void setShop_name(String shop_name) {
        this.shop_name = shop_name;
    }

    public String getShop_tel() {
        return shop_tel;
    }

    public void setShop_tel(String shop_tel) {
        this.shop_tel = shop_tel;
    }

    public String getShop_print() {
        return shop_print;
    }

    public void setShop_print(String shop_print) {
        this.shop_print = shop_print;
    }

    public double getShop_lat() {
        return shop_lat;
    }

    public void setShop_lat(double shop_lat) {
        this.shop_lat = shop_lat;
    }

    public double getShop_lng() {
        return shop_lng;
    }

    public void setShop_lng(double shop_lng) {
        this.shop_lng = shop_lng;
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

}
