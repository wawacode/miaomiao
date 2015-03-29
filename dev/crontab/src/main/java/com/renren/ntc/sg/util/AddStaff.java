package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.biz.dao.CatStaffCommitDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;

import java.io.IOException;
import java.util.List;


public class AddStaff {


    private static long  shop_id= 10027;

    public AddStaff()  {

    }

/**
 * |  6 | 郝孝明    | 18910278618 | 12345  | 2015-03-11 11:24:39 |        NULL |                                             |    0 |
|  7 | 崔俊英    | 13371791032 | 12345  | 2015-03-12 11:43:09 |        NULL |                                             |    0 |
|  9 | 赵顺利    | 15110051743 | 12345  | 2015-03-12 11:48:07 |        NULL |                                             |    0 |                                            |    2 |
| 11 | 焦猛      | 13718170818 | 12345  | 2015-03-26 17:39:04 |        NULL |                                             |    0 |
| 12 | 朱小伟    | 15011551281 | 12345  | 2015-03-26 17:39:20 |        NULL |                                             |    0 |
| 13 | 李洪超    | 13381217567 | 12345  | 2015-03-26 17:39:31 |        NULL |                                             
 * @param args
 */

    public static void main(String[] args)  {
    	String xiaowei = "朱小伟";
    	String xphone = "15011551281";
    	String hxm = "郝孝明";
    	String hxmphone = "18910278618";
    	String cjy = "崔俊英";
    	String cjyphone = "13371791032";
    	String xsl = "赵顺利";
    	String xslphone = "15110051743";
    	String jm = "焦猛";
    	String jmphone = "13718170818";
    	String lhc = "李洪超";
    	String lhcphone = "13381217567";
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        CatStaffCommitDAO ccCommitDAO=  rose.getBean(CatStaffCommitDAO.class);
        ccCommitDAO.updateCatstaff(10053, cjy, cjyphone);
         ccCommitDAO.updateCatstaff(10051, cjy, cjyphone);
         ccCommitDAO.updateCatstaff(10052, cjy, cjyphone);
        // ccCommitDAO.updateCatstaff(10046, cjy, cjyphone);
    }


}