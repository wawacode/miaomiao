package com.renren.ntc.sg.util;

import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.biz.dao.CommunityDAO;
import com.renren.ntc.sg.biz.dao.ShopCommunityDAO;

/**
 * @className getBindCommunity
 * @description 绑定的小区
 * @author LQ
 * @date 2015-3-24 下午11:35:38
 */
public class getBindCommunity {

    private static int shop_id = 10063;

    public static void main(String[] args) {
        getBindCommunity();
    }

    public static void getBindCommunity() {
        RoseAppContext rose = new RoseAppContext();
        ShopCommunityDAO shopCommunityDAO = rose.getBean(ShopCommunityDAO.class);
        CommunityDAO communityDAO = rose.getBean(CommunityDAO.class);
        List<String> communityIds = shopCommunityDAO.getCommunityId(shop_id);

        for (String string : communityIds) {
            String name = communityDAO.getCommunityName(Integer.valueOf(string));
            System.out.println(name);
        }
    }
}
