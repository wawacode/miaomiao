package com.renren.ntc.sg.controllers.console;

import com.renren.ntc.sg.bean.Catstaff;
import com.renren.ntc.sg.biz.dao.CatStaffDAO;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.List;

/**
 * 喵喵员工管理
 */

@Path("catStaff")
public class CatStaffController {

    @Autowired
    private CatStaffDAO catStaffDAO;


    @Post("")
    @Get("")
    public String index(Invocation inv, @Param("value") String value, @Param("from") int from, @Param("offset") int offset) {

        if (0 == from) from = 0;
        if (0 == offset) offset = 50;
        if (StringUtils.isBlank(value)) value = "";
        List<Catstaff> catStaffs = catStaffDAO.getCatStaff(SUtils.wrap(value.trim()), from, offset);

        if (from != 0) {
            int begin = from;
            begin = begin - offset;
            inv.addModel("previous_f", begin < 0 ? 0 : begin);
        }
        if (catStaffs.size() >= offset) {
            inv.addModel("next_f", from + offset);
        }
        inv.addModel("catStaffs", catStaffs);
        inv.addModel("value", value);
        return "allCatSatff";
    }

    @Get("add")
    @Post("add")
    public String add(Invocation inv) {
        return "addCatSatff";
    }

    @Get("insert")
    @Post("insert")
    public String insert(Invocation inv,
                         @Param("name") String name,
                         @Param("phone") String phone,
                         @Param("pwd") String pwd,
                         @Param("cpwd") String cpwd) {
        System.out.println("CatStaffController.java.CatStaffController---->" + 63);
        if (!pwd.equals(cpwd)) {
            inv.addModel("message", "两次密码不一致!");
            return "addCatSatff";
        }
        Catstaff catstaff = new Catstaff(name, phone, pwd, 0);
        catStaffDAO.insert(catstaff);
        return "r:/console/catStaff";
    }

    @Post("update")
    @Get("update")
    public String update(Invocation inv, @Param("id") String str_id, @Param("value") String value) {
        if (StringUtils.isBlank(str_id)) {
            LoggerUtils.getInstance().log(String.format("str_id is null %s ", str_id));
            return "@error";
        }
        String[] values = str_id.split("-");
        if (values.length != 2) {
            LoggerUtils.getInstance().log(
                    String.format("str_id is null %s ", str_id));
            return "@error";
        }
        if (StringUtils.isBlank(value.trim())) {
            LoggerUtils.getInstance().log("value is null");
            return "@error";
        }
        long user_id = Long.valueOf(values[0]);
        catStaffDAO.update(values[1], value, new Date(), user_id);
        return "@" + Constants.DONE;
    }

    @Post("del")
    @Get("del")
    public String del(Invocation inv, @Param("user_id") String user_id, @Param("from") int from, @Param("offset") int offset) {
        if (StringUtils.isBlank(user_id)) {
            LoggerUtils.getInstance().log(String.format("user_id is null %s ", user_id));
            return "@error";
        }
        long id = Long.valueOf(user_id.trim());
        catStaffDAO.del(id);
        return "r:/console/catStaff";
    }


}
