package com.renren.ntc.sg.util;

import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.bean.Community;
import com.renren.ntc.sg.biz.dao.CommunityDAO;
import com.renren.ntc.sg.biz.dao.ShopCommunityDAO;

/**
 * @className getBindCommunity
 * @description 绑定的小区
 * @author LQ
 * @date 2015-3-24 下午11:35:38
 */
public class getBindCommunity {

    private static int shop_id = 10060;

    public static void main(String[] args) {
        updateBindCommunity();
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

    public static void updateBindCommunity() {
        RoseAppContext rose = new RoseAppContext();
        ShopCommunityDAO shopCommunityDAO = rose.getBean(ShopCommunityDAO.class);
        CommunityDAO communityDAO = rose.getBean(CommunityDAO.class);
        List<String> communityIds = shopCommunityDAO.getAllCommunityId();
        System.out.println(">>>:" + communityIds.size());
        for (String id : communityIds) {
            int score = communityDAO.getScore(Integer.valueOf(id));
            score += 100;
            System.out.println("Score:" + score);
            communityDAO.update(Integer.valueOf(id), "score", score + "");
        }
        System.out.println("OK");
    }
}
