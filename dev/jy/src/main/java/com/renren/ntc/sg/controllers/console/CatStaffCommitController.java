package com.renren.ntc.sg.controllers.console;

import com.renren.ntc.sg.bean.CatStaffCommit;
import com.renren.ntc.sg.biz.dao.CatStaffCommitDAO;
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
 * 喵喵员工推广小区管理
 */

@Path("catStaffCommit")
public class CatStaffCommitController {

    @Autowired
    private CatStaffCommitDAO catStaffCommitDAO;


    @Post("")
    @Get("")
    public String index(Invocation inv, @Param("value") String value, @Param("from") int from, @Param("offset") int offset) {

        if (0 == from) from = 0;
        if (0 == offset) offset = 50;
        if (StringUtils.isBlank(value)) value = "";
        List<CatStaffCommit> catStaffCommits = catStaffCommitDAO.getCatStaffCommit(SUtils.wrap(value.trim()), from, offset);

        if (from != 0) {
            int begin = from;
            begin = begin - offset;
            inv.addModel("previous_f", begin < 0 ? 0 : begin);
        }
        if (catStaffCommits.size() >= offset) {
            inv.addModel("next_f", from + offset);
        }
        inv.addModel("catStaffCommits", catStaffCommits);
        inv.addModel("value", value);
        return "allCatStaffCommit";
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
        long catStaffCommt_id = Long.valueOf(values[0]);
        catStaffCommitDAO.update(values[1], value, new Date(), catStaffCommt_id);
        return "@" + Constants.DONE;
    }

    @Post("del")
    @Get("del")
    public String del(Invocation inv, @Param("id") String catStaffCommt_id, @Param("from") int from, @Param("offset") int offset) {

        if (StringUtils.isBlank(catStaffCommt_id)) {
            LoggerUtils.getInstance().log(String.format("catStaffCommt_id is null %s ", catStaffCommt_id));
            return "@error";
        }
        long id = Long.valueOf(catStaffCommt_id.trim());
        catStaffCommitDAO.del(id);
        return "r:/console/catStaffCommit";
    }


}
