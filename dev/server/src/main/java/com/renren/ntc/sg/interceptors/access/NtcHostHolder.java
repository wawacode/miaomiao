package com.renren.ntc.sg.interceptors.access;

import com.renren.ntc.sg.bean.User;


public interface NtcHostHolder {
    /**
     * 返回当前访问者，如果没有登录的话返回null
     * 
     * @return
     */
    public User getUser();

    /**
     * 
     * @param user
     */
    public void setUser(User user);
}
