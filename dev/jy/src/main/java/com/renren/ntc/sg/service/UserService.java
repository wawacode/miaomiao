package com.renren.ntc.sg.service;

import com.renren.ntc.sg.bean.User;
import com.renren.ntc.sg.biz.dao.UserDAO;
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
public class UserService {

    @Autowired
    private UserDAO userDAO;


    public User createUser(String name ,int type,  String pwd, int enable ,String wx_open_id ) {
        User u =  new User ();
        u.setEnable(enable);
        u.setPhone("186");
        u.setType(type);
        u.setName(name);
        u.setPwd(pwd);
        u.setWx_open_id(wx_open_id);
        long  id  = userDAO.createUser(u)   ;
        return userDAO.getUser(id);
    }

    public void updateOpenId(long id, String openId) {
         userDAO.updateOpenId(id,openId);
    }
}
