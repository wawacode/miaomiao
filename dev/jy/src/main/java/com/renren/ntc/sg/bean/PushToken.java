package com.renren.ntc.sg.bean;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-8
 * Time: 下午12:08
 * To change this template use File | Settings | File Templates.
 */
public class PushToken {


    private long   id  ;
    private String ower_phone ;

    public String getChn() {
        return chn;
    }

    public void setChn(String chn) {
        this.chn = chn;
    }

    private String chn;

    private String device_token ;
    private Date create_time;


    public String getDevice_token() {
        return device_token;
    }

    public void setDevice_token(String device_token) {
        this.device_token = device_token;
    }

    public String getOwer_phone() {
        return ower_phone;
    }

    public void setOwer_phone(String ower_phone) {
        this.ower_phone = ower_phone;
    }



    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
