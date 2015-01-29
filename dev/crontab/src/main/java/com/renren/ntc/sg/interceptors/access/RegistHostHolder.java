package com.renren.ntc.sg.interceptors.access;

import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.bean.User;


public interface RegistHostHolder {
    /**
     * 返回当前访问者，如果没有登录的话返回null
     * 
     * @return
     */
    public RegistUser getUser();

    /**
     * 
     * @param user
     */
    public void setUser(RegistUser user);
}
