package com.renren.ntc.sg.bean;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-10-15
 * Time: 下午2:33
 * To change this template use File | Settings | File Templates.
 */
public class Order {

    private long  id;
    private String order_id  ;
    private long   shop_id ;
    private long   user_id;
    private long address_id ;
    private String remarks ="";

    public String getConfirm() {
        return confirm;
    }

    public void setConfirm(String confirm) {
        this.confirm = confirm;
    }


    private int dprice = 0;

    private String confirm ="";
    private String pre_id ="";
    private String msg ="";
    private String snapshot="" ;
    private int status    ;
    private String info ;

    public String getAct() {
        return act;
    }

    public void setAct(String act) {
        this.act = act;
    }

    public int getDprice() {
        return dprice;
    }

    public void setDprice(int dprice) {
        this.dprice = dprice;
    }

    private String act = "" ;



    private  int readed = 0;


    private String address  ;
    private String phone  ;
    private int  price  ;



    private String  price4V  ;
    private Date create_time ;
    private Date update_time   ;

    public String getShop_name4V() {
        return shop_name4V;
    }

    public void setShop_name4V(String shop_name4V) {
        this.shop_name4V = shop_name4V;
    }

    private String shop_name4V = "" ;

    public int getReaded() {
        return readed;
    }

    public void setReaded(int read) {
        this.readed = read;
    }
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    public String getPrice4V() {
        return price4V;
    }
    public String getPre_id() {
        return pre_id;
    }

    public void setPre_id(String pre_id) {
        this.pre_id = pre_id;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }


    public void setPrice4V(String price4V) {
        this.price4V = price4V;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }



    public String getStatus4V() {
        return status4V;
    }

    public void setStatus4V(String status4V ) {
        this.status4V = status4V;
    }

    private String status4V ;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOrder_id() {
        return order_id;
    }

    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }

    public long getShop_id() {
        return shop_id;
    }

    public void setShop_id(long shop_id) {
        this.shop_id = shop_id;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public long getAddress_id() {
        return address_id;
    }

    public void setAddress_id(long address_id) {
        this.address_id = address_id;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getSnapshot() {
        return snapshot;
    }

    public void setSnapshot(String snapshot) {
        this.snapshot = snapshot;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
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

}
