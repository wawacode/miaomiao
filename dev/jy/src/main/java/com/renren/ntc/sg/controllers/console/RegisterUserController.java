package com.renren.ntc.sg.controllers.console;

import java.util.Date;
import java.util.List;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
import org.apache.velocity.tools.generic.DateTool;
import org.springframework.beans.factory.annotation.Autowired;

import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.biz.dao.RegistUserDAO;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;

/**
 * 注册用户管理
 *
 * @author ZhaoXiuFei
 * @date 2015年4月10日下午2:08:03
 */
@SuppressWarnings("static-access")
@Path("registerUser")
public class RegisterUserController {

    @Autowired
    RegistUserDAO registUserDAO;

    @Post("")
    @Get("")
    public String index(Invocation inv, @Param("from") int from, @Param("offset") int offset) {
        if (0 == from) {
            from = 0;
        }
        if (0 == offset) {
            offset = 10;
        }
        List<RegistUser> users = registUserDAO.getAllUser(from, offset);
        if (from != 0) {
            int begin = from;
            begin = begin - offset;
            inv.addModel("previous_f", begin < 0 ? 0 : begin);
        }
        if (users.size() >= offset) {
            inv.addModel("next_f", from + offset);
        }
        inv.addModel("users", users);
        inv.addModel("date", new DateTool());
        return "allRegistUser";
    }

    @Post("update")
    @Get("update")
    public String update(Invocation inv, @Param("id") String str_id, @Param("value") String value) {
        if (StringUtils.isBlank(str_id)) {
            LoggerUtils.getInstance().log(String.format("str_id is null %s ", str_id));
            return "@error";
        }
        String[] keys = str_id.split("-");
        if (keys.length != 2) {
            LoggerUtils.getInstance().log(
                    String.format("str_id is null %s ", str_id));
            return "@error";
        }
        if (StringUtils.isBlank(value.trim())) {
            LoggerUtils.getInstance().log("value is null");
            return "@error";
        }
        long user_id = Long.valueOf(keys[0]);
        registUserDAO.update(registUserDAO.TABLE_NAME, user_id, keys[1], value, new Date());
        return "@" + Constants.DONE;
    }

    @Post("del")
    @Get("del")
    public String del(Invocation inv, @Param("user_id") String user_id, @Param("from") int from, @Param("offset") int offset) {
        if (StringUtils.isBlank(user_id.trim())) {
            LoggerUtils.getInstance().log(String.format("user_id is null %s ", user_id));
            return "@error";
        }
        long id = Long.valueOf(user_id);
        registUserDAO.del(registUserDAO.TABLE_NAME, id);
        return new StringBuilder("r:/console/registerUser?from=").append(from).append("&offset=").append(offset).toString();
    }

    @Post("advSearch")
    @Get("advSearch")
    public String advSearch(Invocation inv, @Param("key") String key, @Param("from") int from, @Param("offset") int offset) {
        if (0 == from) {
            from = 0;
        }
        if (0 == offset) {
            offset = 20;
        }
        if (StringUtils.isBlank(key.trim())) {
            LoggerUtils.getInstance().log(String.format("key is null %s ", key));
            return "@error";
        }
        if (from != 0) {
            int begin = from;
            begin = begin - offset;
            inv.addModel("previous_f", begin < 0 ? 0 : begin);
        }
        List<RegistUser> users = registUserDAO.advSearch(registUserDAO.TABLE_NAME, SUtils.wrap(key), from, offset);
        if (users.size() >= offset) {
            inv.addModel("next_f", from + offset);
        }
        inv.addModel("users", users);
        inv.addModel("adv_search_value", key);

        return "allRegistUser";
    }

}
