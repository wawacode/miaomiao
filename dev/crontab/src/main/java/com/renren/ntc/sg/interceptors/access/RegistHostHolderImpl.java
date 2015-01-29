package com.renren.ntc.sg.interceptors.access;

import com.renren.ntc.sg.bean.RegistUser;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.InvocationLocal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.rmi.registry.Registry;


@Service
public class RegistHostHolderImpl implements RegistHostHolder {

    private static final String KEY_CUR_USER = "__current_user__";

    @Autowired
    InvocationLocal             inv;

    @Override
    public RegistUser getUser() {
        Invocation inv = this.inv.getCurrent(false);
        if (inv != null) {
            return (RegistUser) inv.getRequest().getAttribute(KEY_CUR_USER);
        } else {
            return null;
        }
    }

    public void setUser(RegistUser user) {
        inv.getRequest().setAttribute(KEY_CUR_USER, user);
    }

}
