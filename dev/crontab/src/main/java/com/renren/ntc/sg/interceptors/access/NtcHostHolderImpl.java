package com.renren.ntc.sg.interceptors.access;

import com.renren.ntc.sg.bean.User;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.InvocationLocal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class NtcHostHolderImpl implements NtcHostHolder {

    private static final String KEY_CUR_USER = "__current_user__";

    @Autowired
    InvocationLocal             inv;

    @Override
    public User getUser() {
        Invocation inv = this.inv.getCurrent(false);
        if (inv != null) {
            return (User) inv.getRequest().getAttribute(KEY_CUR_USER);
        } else {
            return null;
        }
    }

    public void setUser(User user) {
        inv.getRequest().setAttribute(KEY_CUR_USER, user);
    }

}
