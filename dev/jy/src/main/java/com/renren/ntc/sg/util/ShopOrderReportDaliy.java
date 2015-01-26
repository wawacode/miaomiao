package com.renren.ntc.sg.util;

import java.util.ArrayList;
import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import org.apache.commons.collections.CollectionUtils;

import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.ShopOrderReport;
import com.renren.ntc.sg.bean.ShopOrderReport.ShopOrderFlow;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.mail.MailSendInfo;
import com.renren.ntc.sg.mail.MailSendServer;
import com.renren.ntc.sg.service.LoggerUtils;

/**
 * 
 * 每日发邮件的工具 每家店铺的日成交额和订单总量
 *
 */
public class ShopOrderReportDaliy {
	public static void main(String[] args) {
      RoseAppContext rose = new RoseAppContext();
      ShopDAO  shopDao = rose.getBean(ShopDAO.class);
	  OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
	  List<Shop> shops = shopDao.getAllShopsByAudit(1);
	  if(CollectionUtils.isEmpty(shops)){
		  return;
	  }
	  List<ShopOrderReport> shopOrderReports = new ArrayList<ShopOrderReport>();
	  for(Shop shop : shops){
		  long shopId = shop.getId();
		 List<Order> orders = orderDao.getOrder(Dateutils.tranferDate2Str(Dateutils.getDateByCondition(-1, 0, 0, 0)), Dateutils.tranferDate2Str(Dateutils.getDateByCondition(-1, 23, 59, 59)), SUtils.generOrderTableName(shopId));
		ShopOrderReport shopOrderReport = new ShopOrderReport();
		shopOrderReport.setShopId(shopId);
		shopOrderReport.setShopName(shop.getName());
		shopOrderReport.setReportDate(Dateutils.tranferDefaultDate2Str(Dateutils.getDateByCondition(-1, 0, 0, 0)));
		int orderCount=0;
		int orderTotalPrice=0;
		String createOrderTime = "";
		List<ShopOrderFlow> shopOrderFlows = new ArrayList<ShopOrderReport.ShopOrderFlow>();
		for(Order order : orders){
			if(order.getShop_id() == shopId){
				orderCount++;
				orderTotalPrice += order.getPrice();
				createOrderTime = Dateutils.tranferDate2Str(order.getCreate_time());
				ShopOrderFlow shopOrderFlow = shopOrderReport.new ShopOrderFlow();
				shopOrderFlow.setOrderCreateTime(createOrderTime);
				shopOrderFlow.setOrderPrice(((float )order.getPrice()/100) +"元");
				shopOrderFlow.setOrderNo(order.getOrder_id());
				shopOrderFlows.add(shopOrderFlow);
			}
		}
		shopOrderReport.setShopOrderFlows(shopOrderFlows);
		shopOrderReport.setOrderCount(orderCount);
		shopOrderReport.setTotalPrice(((float )orderTotalPrice/100) +"元");
		shopOrderReports.add(shopOrderReport);
	  }
	  LoggerUtils.getInstance().log(String.format("shopOrderReports size is %s ",shopOrderReports.size()+""));
	  MailSendServer mailSendServer = com.renren.ntc.sg.mail.MailSendServer.getServer("smtp.163.com", 25, "lee_yeah1@163.com", "Lee1qaz2wsx",
              "lee_yeah1@163.com");
	  String to1 = "dev@lizi-inc.com";
	  String to2 = "huangweiyuan@lizi-inc.com";
	  String to3 = "luziyu@lizi-inc.com";
	  String to4 = "zhuyunming@lizi-inc.com";
	  String[] to = new String[4];
	  to[0] = to1;
	  to[1] = to2;
	  to[2] = to3;
	  to[3] = to4;
	  mailSendServer.sendTextInfo(new MailSendInfo("喵喵每日订单详情",getHtmlInfo(shopOrderReports), to, new String[0]),false);
	}
	
	private static String getHtmlInfo(List<ShopOrderReport> shopOrderReports){
		String html = "<html><head><title></title></head><body>"
					 + "<table border='1' cellpadding='1' cellspacing='1' style='width: 1000px;'>"
					 + "<tbody> <tr> <td> 店铺ID</td> <td> 店铺名称</td> <td> 订单报告日期</td> <td> 订单总数</td> <td> 总的成交额</td> <td colspan='3' align='center'> 每笔订单详情</td> </tr>";
					 
    String orderInfoHtml = "";
	for(ShopOrderReport shopOrderReport : shopOrderReports){
		List<ShopOrderFlow> shopOrderFlows = shopOrderReport.getShopOrderFlows();
		int rowspan = shopOrderFlows.size() + 1;
		orderInfoHtml = orderInfoHtml + "<tr> <td rowspan='"+rowspan+"'>"+shopOrderReport.getShopId()+"</td> <td rowspan='"+rowspan+"'>"+shopOrderReport.getShopName()+"</td> <td rowspan='"+rowspan+"'>"+shopOrderReport.getReportDate()+"</td> <td rowspan='"+rowspan+"'>"+shopOrderReport.getOrderCount()+"</td> <td rowspan='"+rowspan+"'>"+shopOrderReport.getTotalPrice()+"</td>";
		orderInfoHtml = orderInfoHtml + "<td> 订单时间</td> <td> 订单号</td> <td> 订单金额</td> </tr>";
		for(ShopOrderFlow shopOrderFlow : shopOrderFlows){
			orderInfoHtml = orderInfoHtml + "<tr><td>"+shopOrderFlow.getOrderCreateTime()+"</td><td>"+shopOrderFlow.getOrderNo()+"</td> <td>"+shopOrderFlow.getOrderPrice()+"</td> </tr>";
		}
	}
	orderInfoHtml = orderInfoHtml + "</tbody> </table> </body> </html>";
	return html + orderInfoHtml;
	}
}
