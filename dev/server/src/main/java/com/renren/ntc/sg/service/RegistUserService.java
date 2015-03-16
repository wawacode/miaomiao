package com.renren.ntc.sg.service;

import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.bean.User;
import com.renren.ntc.sg.biz.dao.RegistUserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-8
 * Time: 下午12:09
 * To change this template use File | Settings | File Templates.
 */
@Service
public class RegistUserService {

    @Autowired
    private RegistUserDAO userDAO;


    public RegistUser createUser(String name ,int type,  String pwd, int enable  ) {
        RegistUser u =  new RegistUser ();
        u.setEnable(enable);
        u.setType(type);
        u.setName(name);
        u.setPwd(pwd);
        long  id  = userDAO.createUser(u)   ;
        return userDAO.getUser(id);
    }

    public RegistUser getUserByName(String name) {
        return userDAO.getUserbyName(name);
    }

    public RegistUser getUserByPhone  (String phone) {
        return userDAO.getUserbyName(phone);
    }
}
