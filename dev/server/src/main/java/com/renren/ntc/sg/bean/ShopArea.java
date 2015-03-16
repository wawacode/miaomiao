package com.renren.ntc.sg.bean;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-10-15
 * Time: 下午2:13
 * To change this template use File | Settings | File Templates.
*/
public class ShopArea {


    private  long id ;
    private  String area_name = "";
    private long shop_id = 0;

    private  double max_lat ;
    private  double min_lat ;


    private  double max_lng ;
    private  double min_lng ;
    private Date update_time ;
    private Date create_time ;


    public Date getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(Date update_time) {
        this.update_time = update_time;
    }



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getArea_name() {
        return area_name;
    }

    public void setArea_name(String area_name) {
        this.area_name = area_name;
    }

    public long getShop_id() {
        return shop_id;
    }

    public void setShop_id(long shop_id) {
        this.shop_id = shop_id;
    }


    public double getMax_lat() {
        return max_lat;
    }

    public void setMax_lat(double max_lat) {
        this.max_lat = max_lat;
    }

    public double getMin_lat() {
        return min_lat;
    }

    public void setMin_lat(double min_lat) {
        this.min_lat = min_lat;
    }

    public double getMax_lng() {
        return max_lng;
    }

    public void setMax_lng(double max_lng) {
        this.max_lng = max_lng;
    }

    public double getMin_lng() {
        return min_lng;
    }

    public void setMin_lng(double min_lng) {
        this.min_lng = min_lng;
    }

    public Date getCreate_time() {

        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }


}
