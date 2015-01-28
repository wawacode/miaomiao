package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;


public class ReadExcelSycProduct2Item {




    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        for (int i = 0 ;i<100000 ;){
          List<Item> itls = itemDao.getItems(SUtils.generTableName(1), 1, i, 1000);
          for (Item it : itls ) {
              Product p = pdDao.geProductsByserialNo(it.getSerialNo());
              if ( null ==p || p.getPic_url() == null ){
                  continue;
              }
              System.out.println(p.getSerialNo() + " " +  p.getName() + " " + p.getPic_url() );
              itemDao.update(SUtils.generTableName(1),p.getSerialNo(), p.getName(),p.getPic_url());
          }
          i = i + 1000;
          if (itls.size() == 0 ){
              break;
          }
        }
    }


}