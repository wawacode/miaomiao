package com.renren.ntc.sg.controllers.console;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.MimeTypeUtils;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;

/**
 * 地推人员工具
 *
 * @author zhaoxiufei
 */
@Path("tools")
public class ToolsController {

    @Autowired
    ProductDAO pDao;

    @Autowired
    ItemsDAO itemDao;

    @Autowired
    ShopDAO shopDAO;

    @Autowired
    CategoryDAO categoryDAO;

    @Autowired
    CatStaffCommitDAO catStaffCommitDAO;

    @Get("")
    @Post("")
    public String login(Invocation inv) {
        System.out.println("ToolsController.java.ToolsController---->" + 56);
        return "db_login";
    }

    @Get("login/valid")
    @Post("login/valid")
    public String valid(Invocation inv, @Param("phone") String phone, @Param("pwd") String pwd) {
        List<CatStaffCommit> u = catStaffCommitDAO.getCatStaffCommit(phone, pwd);//只能操作自己建立的店铺
        if (0 == u.size()) {
            inv.addModel("msg", "用户名字或密码不正确");
            return "db_login";
        }
        List<Shop> notOnlineList = new ArrayList<Shop>();//未上线店
        List<Shop> allShops = new ArrayList<Shop>();
        for (int i = 0; i < u.size(); i++) {
            long shop_id = u.get(i).getShop_id();
            Shop notOnlineShop = shopDAO.getShopByNotOnline(shop_id);//未上线
            Shop shop = shopDAO.getShopById(shop_id);//所有店
            shopDAO.getShopById(shop_id);
            if (null != notOnlineShop) {
                notOnlineList.add(notOnlineShop);
            }
            if (null != shop) {
                allShops.add(shop);
            }
        }
        inv.addModel("notOnlineList", notOnlineList);
        inv.addModel("allShops", allShops);
        LoggerUtils.getInstance().log(" OK ");
        return "tools_bd";
    }

    @Get("db")
    @Post("db") //bd 所有未上线的
    public String db(Invocation inv) {
        List<Shop> list = shopDAO.getAllShopsByNotOnline();
        inv.addModel("notOnlineList", list);
        inv.addModel("allShops", list);
        List<Category> categoryList = categoryDAO.getCategory();
        inv.addModel("categoryList", categoryList);
        LoggerUtils.getInstance().log(" OK ");
        return "tools_bd";
    }

    @Get("synch")
    @Post("synch")//TODO 本人操作 所有店铺
    public String synch(Invocation inv) {
        List<Shop> list = shopDAO.getAllShops();
        inv.addModel("list", list);
        List<Category> categoryList = categoryDAO.getCategory();
        inv.addModel("categoryList", categoryList);
        LoggerUtils.getInstance().log(" OK ");
        return "tools";
    }

    /**
     * 首次上传扫码文件
     *
     * @param inv
     * @param shop_id
     * @param file
     * @return
     */
    @Get("uploadFile")
    @Post("uploadFile")
    public String uploadFile(Invocation inv, @Param("shop_id") long shop_id, @Param("file") MultipartFile file) {
        if (null == file) {
            return "@ 文件不能为空!";
        }
        if (!MimeTypeUtils.TEXT_PLAIN.equals(file.getContentType())) {
            return "@文件类型有误! 只支持.txt类型文件!";
        }
        //删除初始商品
        itemDao.del(SUtils.generTableName(shop_id), shop_id);
        //保存数据到数据库
        saveToDB(inv, shop_id, file, false);
//		if (MimeTypeUtils.APPLICATION_EXCEL_2003_2007.equals(contentType)) {
//			boolean result = readXLS(f, shop_id);
//			if(!result){
//				return "@内容格式错误!";
//			}
//		}
//		if (MimeTypeUtils.APPLICATION_EXCEL_2010_2013.equals(contentType)) {
//			boolean result = readXLSX(f, shop_id);
//			if(!result){
//				return "@内容格式错误!";
//			}
//		}
        LoggerUtils.getInstance().log(" OK!");
        return "toolsDetail";
    }

    /**
     * 续传条码文件
     *
     * @param inv
     * @param shop_id
     * @param file
     * @return
     */
    @Get("replenish")
    @Post("replenish")
    public String replenish(Invocation inv, @Param("shop_id") long shop_id, @Param("file") MultipartFile file) {
        if (null == file) {
            return "@ 文件不能为空!";
        }
        if (!MimeTypeUtils.TEXT_PLAIN.equals(file.getContentType())) {
            return "@文件类型有误! 只支持.txt类型文件!";
        }
        //保存数据到数据库
        saveToDB(inv, shop_id, file, true);
        LoggerUtils.getInstance().log(" OK!");
        return "toolsDetail";
    }

    /**
     * 保存数据到数据库
     *
     * @param inv
     * @param shop_id
     * @param file
     */
    private void saveToDB(Invocation inv, @Param("shop_id") long shop_id, @Param("file") MultipartFile file, boolean isReplenish) {
        BufferedReader br = null;
        Map<Integer, Integer> saveCategoryNum = new HashMap<Integer, Integer>();//每个分类导入多少商品
        List<String> missingList = new ArrayList<String>();//丢弃多少项目的统计
        try {
            br = new BufferedReader(new InputStreamReader(file.getInputStream(), "GBK"));
            String lineTxt = br.readLine();
            String regex = lineTxt.contains("\t") ? "\t" : lineTxt.contains(",") ? ", " : " ";
            int count = 0;
            int successNum = 0;
            do {
                if (!StringUtils.isBlank(lineTxt)) {
                    count++;
                    if (count % 1000 == 0) {
                        Thread.sleep(100);
                    }
                    String[] arr = lineTxt.split(regex);
                    String serialNo = upacage(arr[0].trim());
                    if (serialNo.length() < 8 || serialNo.length() > 14) {
                        missingList.add(serialNo);
                        continue;
                    }
                    //去商店对应商品库查询
                    Item item = itemDao.getItem(SUtils.generTableName(shop_id), shop_id, serialNo);
                    //有的话continue
                    if (null != item) {
                        int category_id = item.getCategory_id();
                        System.out.println("当前count:" + count + "-->本店已有此商品:" + serialNo);
                        //saveCategoryNum.put(category_id, saveCategoryNum.get(category_id) == null ? 1 : saveCategoryNum.get(category_id) + 1);
                        continue;
                    }
                    Product p = pDao.geProduct(serialNo);
                    Item it = new Item();
                    it.setShop_id(shop_id);
                    it.setSerialNo(serialNo);
                    it.setName(p == null ? serialNo : p.getName());
                    it.setPrice(p == null ? 0 : arr.length == 2 ? Integer.valueOf(arr[1]) : p.getPrice());
                    it.setCount(1000);
                    int category_id = p == null ? 28 : p.getCategory_id();
                    it.setCategory_id(category_id);
                    it.setPic_url(p == null ? "" : p.getPic_url() == null ? "" : p.getPic_url());
                    it.setScore(p == null ? 0 : p.getScore());

                    if (null == p || it.getPrice() == 0) {
                        it.setOnsell(0);
                    }
                    LoggerUtils.getInstance().log("条形码:\t" + serialNo + " 产品名称:\t" + it.getName() + "\t价格:\t" + it.getPrice());

                    itemDao.insert(SUtils.generTableName(shop_id), it);
                    saveCategoryNum.put(category_id, saveCategoryNum.get(category_id) == null ? 1 : saveCategoryNum.get(category_id) + 1);
                    successNum++;//总计
                }
            } while ((lineTxt = br.readLine()) != null);
            //遍历map集合  替换分类为中文名字
            Map<String, Integer> saveCategoryNumCN = new HashMap<String, Integer>();//每个分类导入多少商品
            converterCN(saveCategoryNum, saveCategoryNumCN);
            inv.addModel("saveCategoryNumCN", saveCategoryNumCN); //成功的
            inv.addModel("missingList", missingList); //丢失
            inv.addModel("count", count); //总数
            //inv.addModel("successNum", count - missingList.size()); //成功总数
            inv.addModel("shop_id", shop_id);
            //保存扫码数量 和 成功数量
            CatStaffCommit catStaffCommit = catStaffCommitDAO.getbyShopId(shop_id);
            if (isReplenish) {
                catStaffCommitDAO.update(shop_id, catStaffCommit.getSerialNo_num() + count, catStaffCommit.getSuccess_num() + successNum);
            } else {
                catStaffCommitDAO.update(shop_id, count, successNum);
            }

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != br) {
                    br.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        LoggerUtils.getInstance().log(" OK ");
    }

    /**
     * '
     * 1.同步A店某一个分类到B店
     * http://127.0.0.1:8080/catstaff/tools/mvShopItems?from_shop_id=1&category_id=15&to_shop_id=10083
     *
     * @param inv
     * @param from_shop_id
     * @param category_id
     * @param to_shop_id
     * @return
     */
    @Get("mvShopItems")
    @Post("mvShopItems")
    public String mvCategory(Invocation inv, @Param("from_shop_id") long from_shop_id, @Param("category_id") int category_id, @Param("to_shop_id") long to_shop_id) {
        if (0 == from_shop_id) {
            return "@ from_shop_id 不能为空";
        } else if (0 == category_id) {
            return "@ category_id 不能为空";
        } else if (0 == to_shop_id) {
            return "@ to_shop_id 不能为空";
        }
        Map<Integer, Integer> saveCategoryNum = new HashMap<Integer, Integer>();//每个分类导入多少商品
        int count = 0;
        boolean flag = true;
        int from = 0;
        int offset = 100;//每次查100条 如果够
        do {
            List<Item> itemls = itemDao.getItems(SUtils.generTableName(from_shop_id), from_shop_id, category_id, from, offset);
            if (itemls.size() == 0) {
                flag = false;
                break;
            }
            for (Item item : itemls) {
                item.setShop_id(to_shop_id);
                item.setCount(1000);
                Item ii = itemDao.getItem(SUtils.generTableName(to_shop_id), to_shop_id, item.getSerialNo());
                if (null == ii) {
                    itemDao.insert(SUtils.generTableName(to_shop_id), item);
                } else {
                    itemDao.updateforSerialNo(SUtils.generTableName(to_shop_id), item, item.getSerialNo());
                }
                count++;
                saveCategoryNum.put(item.getCategory_id(), saveCategoryNum.get(item.getCategory_id()) == null ? 1 : saveCategoryNum.get(item.getCategory_id()) + 1);
            }
            from = from + offset;
            if (count % 1000 == 0) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        } while (flag);
        //遍历map集合  替换分类为中文名字
        Map<String, Integer> saveCategoryNumCN = new HashMap<String, Integer>();//每个分类导入多少商品
        converterCN(saveCategoryNum, saveCategoryNumCN);
        inv.addModel("saveCategoryNumCN", saveCategoryNumCN); //成功
        inv.addModel("count", count); //总数
        inv.addModel("shop_id", to_shop_id);
        LoggerUtils.getInstance().log(" OK ");
        return "toolsDetail";
    }

    @Get("mvhhj")
    @Post("mvhhj")// 上架哈哈镜
    public String mvhhj(Invocation inv, @Param("to_shop_id") long to_shop_id) {
        System.out.println("ToolsController.java.ToolsController---->" + 316);
        if (0 == to_shop_id) {
            return "@to_shop_id is null !";
        }
        long from_shop_id = 10113;
        int category_id = 15;

        return "r:/console/tools/mvShopItems?from_shop_id=" + from_shop_id + "&category_id=" + category_id + "&to_shop_id=" + to_shop_id;
    }

    /**
     * 把A店商品同步到B店
     *
     * @param inv
     * @return
     * @author ZhaoXiuFei
     * @date 2015年4月12日上午10:50:49
     */
    @Get("copyShopAllItems")
    @Post("copyShopAllItems")
    public String copyShopAllItems(Invocation inv, @Param("from_shop_id") String from_shop_id, @Param("to_shop_id") String to_shop_id) {
        System.out.println("test controller");
        if (StringUtils.isBlank(from_shop_id)) {
            return "@ from_shop_id 不能为空";
        }
        if (StringUtils.isBlank(from_shop_id)) {
            return "@ to_shop_id 不能为空";
        }
        long toShopId = Long.valueOf(to_shop_id);
        //删除原来已有商品
        itemDao.del(SUtils.generTableName(toShopId), toShopId);

        Map<Integer, Integer> saveCategoryNum = new HashMap<Integer, Integer>();//每个分类导入多少商品

        long fromShopId = Long.valueOf(from_shop_id);
        int from = 0;
        int offset = 100;
        int count = 0;
        boolean flag = true;
        do {
            List<Item> itemls = itemDao.getItems(SUtils.generTableName(fromShopId), fromShopId, from, offset);
            if (itemls.size() == 0) {
                flag = false;
                break;
            }
            for (Item item : itemls) {
                count++;
                itemDao.insert(SUtils.generTableName(toShopId), item);//插入新数据
                saveCategoryNum.put(item.getCategory_id(), saveCategoryNum.get(item.getCategory_id()) == null ? 1 : saveCategoryNum.get(item.getCategory_id()) + 1);
            }
            from = from + offset;
            if (count % 1000 == 0) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        } while (flag);
        //遍历map集合  替换分类为中文名字
        Map<String, Integer> saveCategoryNumCN = new HashMap<String, Integer>();//每个分类导入多少商品
        converterCN(saveCategoryNum, saveCategoryNumCN);
        inv.addModel("saveCategoryNumCN", saveCategoryNumCN); //成功
        inv.addModel("shop_id", to_shop_id);
        inv.addModel("count", count); //总数
        LoggerUtils.getInstance().log(" OK ");
        return "toolsDetail";
    }

    /**
     * 2.同步A店商品到主库
     *
     * @param inv
     * @return
     */
    @Get("refresh2Product")
    @Post("refresh2Product")
    public String refresh2Product(Invocation inv, @Param("shop_id") long shop_id) {
        if (0 == shop_id) {
            return "@ shop_id 不能为空";
        }
        Map<Integer, Integer> saveCategoryNum = new HashMap<Integer, Integer>();//每个分类导入多少商品
        int count = 0;
        int from = 0;
        int offset = 500;
        boolean flag = true;
        do {
            List<Item> itemls = itemDao.getItems(SUtils.generTableName(shop_id), shop_id, from, offset);
            if (itemls.size() == 0) {
                flag = false;
                break;
            }
            for (Item item : itemls) {
                Product p = null;
                Product pp = pDao.geProductsByserialNo(item.getSerialNo());

                if (null != pp) {
                    p = pp;
                } else {
                    p = new Product();
                }

                int price = item.getPrice() > p.getPrice() ? item.getPrice() : p.getPrice();//更改价格时 保留最高值的那个
                p.setCategory_id(item.getCategory_id());
                p.setScore(item.getScore());
                p.setPic_url(item.getPic_url());
                p.setPrice(price);
                p.setName(item.getName());
                p.setSerialNo(item.getSerialNo());
                if (null != pp) {
                    System.out.println("update into " + p.getSerialNo());
                    pDao.updateBySerialNo(p, item.getSerialNo());
                } else {
                    System.out.println("insert into " + p.getSerialNo());
                    pDao.insert(p);
                }
                count++;
                saveCategoryNum.put(item.getCategory_id(), saveCategoryNum.get(item.getCategory_id()) == null ? 1 : saveCategoryNum.get(item.getCategory_id()) + 1);
            }
            from = from + offset;
            if (count % 1000 == 0) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        } while (flag);
        //遍历map集合  替换分类为中文名字
        Map<String, Integer> saveCategoryNumCN = new HashMap<String, Integer>();//每个分类导入多少商品
        converterCN(saveCategoryNum, saveCategoryNumCN);
        inv.addModel("saveCategoryNumCN", saveCategoryNumCN); //成功
        inv.addModel("count", count); //总数
        inv.addModel("shop_id", shop_id);
        LoggerUtils.getInstance().log(" OK ");
        return "toolsDetail";
    }

    /**
     * ajax 获取商店商品分类
     * bd使用
     *
     * @param inv
     * @param shop_id
     * @return
     */
    @Get("getCategoriesByShopId")
    @Post("getCategoriesByShopId")
    public String getCategoriesByShopId(Invocation inv, @Param("shop_id") long shop_id) {
        if (0 == shop_id) {
            return "@ shop_id 不能为空";
        }
        List<Item> shopCategoryList = itemDao.getCategoriesByShopId(SUtils.generTableName(shop_id));
        List<JSONObject> clist = new ArrayList<JSONObject>();
        for (Item item : shopCategoryList) {
            Category category = categoryDAO.getCategory(item.getCategory_id());
            if (null != category) {
                JSONObject jo = new JSONObject();
                jo.put("id", item.getCategory_id());
                jo.put("name", category.getName());
                clist.add(jo);
            }
        }
        List<Shop> slist = shopDAO.getAllShopsByNotOnline();
        List<Shop> newShopList = new ArrayList<Shop>(slist.size() - 1);

        for (Shop s : slist) {
            if (s.getId() != shop_id) {
                newShopList.add(s);
            }
        }
        JSONObject jo = new JSONObject();
        jo.put("category", clist);
        jo.put("shop", newShopList);
        return "@json:" + jo.toJSONString();
    }

    /**
     * ajax 获取商店商品分类
     * 本人操作 显示所有店
     *
     * @param inv
     * @param shop_id
     * @return
     */
    @Get("getCategoriesByShopId2")
    @Post("getCategoriesByShopId2")
    public String getCategoriesByShopId2(Invocation inv, @Param("shop_id") long shop_id) {
        if (0 == shop_id) {
            return "@ shop_id 不能为空";
        }
        List<Item> shopCategoryList = itemDao.getCategoriesByShopId(SUtils.generTableName(shop_id));
        List<JSONObject> clist = new ArrayList<JSONObject>();
        for (Item item : shopCategoryList) {
            Category category = categoryDAO.getCategory(item.getCategory_id());
            if (null != category) {
                JSONObject jo = new JSONObject();
                jo.put("id", item.getCategory_id());
                jo.put("name", category.getName());
                clist.add(jo);
            }
        }
        List<Shop> slist = shopDAO.getAllShops();
        List<Shop> newShopList = new ArrayList<Shop>(slist.size() - 1);

        for (Shop s : slist) {
            if (s.getId() != shop_id) {
                newShopList.add(s);
            }
        }
        JSONObject jo = new JSONObject();
        jo.put("category", clist);
        jo.put("shop", newShopList);
        return "@json:" + jo.toJSONString();
    }

    //This is test mthod!
    @Get("login")
    @Post("login")
    public String login(Invocation inv, @Param("shop_id") String shop_id) {
        System.out.println("ToolsController.java.ToolsController---->" + 406);
        long id = 0;

        if (StringUtils.isBlank(shop_id)) return "@shop_id is null!";
        else id = Long.valueOf(shop_id);

        Shop shop = shopDAO.getShop(id);
        String pwd = shop.getTel();
        String phone = shop.getTel();
        String origURL = "127.0.0.1";

        return "r:/console/login/valid?phone=" + phone + "&pwd=" + pwd + "&origURL=" + origURL + "";
    }

    /**
     * 商品种类数字到中文的转换
     *
     * @param saveCategoryNum
     * @param saveCategoryNumCN
     * @author ZhaoXiuFei
     * @date 2015年4月12日上午11:55:41
     */
    private void converterCN(Map<Integer, Integer> saveCategoryNum, Map<String, Integer> saveCategoryNumCN) {
        for (Map.Entry<Integer, Integer> entry : saveCategoryNum.entrySet()) {
            Category category = categoryDAO.getCategory(entry.getKey());
            if (null != category)
                saveCategoryNumCN.put(category.getName(), entry.getValue());
            else
                saveCategoryNumCN.put("没有分类", saveCategoryNumCN.get("没有分类") == null ? entry.getValue() : saveCategoryNumCN.get("没有分类") + entry.getValue());
        }
    }

    /**
     * 2010-2013Excel
     */
    @SuppressWarnings("unused")
    private boolean readXLSX(File file, long shop_id) {
        boolean flag = false;
        XSSFWorkbook xssfWorkbook = null;
        try {
            xssfWorkbook = new XSSFWorkbook(file);
            XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(0);
            int firstRowIndex = xssfSheet.getFirstRowNum();// 第一行
            int lastRowIndex = xssfSheet.getLastRowNum();// 最后一行
            for (int rIndex = firstRowIndex; rIndex <= lastRowIndex; rIndex++) {// 遍历第一个有效行和最后一行之间的值
                XSSFRow xssfRow = xssfSheet.getRow(rIndex);// 获取一行
                if (null != xssfRow) {
                    XSSFCell serialNoCell = xssfRow.getCell(0);// 获取一个单元格
                    XSSFCell priceCell = xssfRow.getCell(1);// 获取第2个单元格
                    if (null != serialNoCell) {
                        int price = 0;
                        if (null != priceCell) {
                            price = Integer.valueOf(priceCell.toString());
                        }
                        String serialNo = upacage(serialNoCell.toString().trim());
                        if (serialNo.toString().length() <= 24) {
                            saveData(shop_id, serialNo, price);
                        }
                    }
                }
            }
            flag = true;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        } finally {
            if (null != xssfWorkbook) {
                try {
                    xssfWorkbook.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return flag;
    }

    /**
     * 2003-2007 Excel
     */
    @SuppressWarnings({"unused", "resource"})
    private boolean readXLS(File file, long shop_id) {
        boolean flag = false;
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(file);
            HSSFWorkbook wb = new HSSFWorkbook(fis);
            HSSFSheet sh = wb.getSheetAt(0);// 获取第一个工作空间
            for (int rIndex = sh.getFirstRowNum(); rIndex <= sh.getLastRowNum(); rIndex++) {// 遍历第一个有效行和最后一行之间的值
                HSSFRow row = sh.getRow(rIndex);// 获取一行
                if (row != null) {
                    HSSFCell serialNoCell = row.getCell(0);// 获取第1个单元格
                    HSSFCell priceCell = row.getCell(1);// 获取第2个单元格
                    if (null != serialNoCell) {
                        int price = 0;
                        if (null != priceCell) {
                            price = Integer.valueOf(priceCell.toString());
                        }
                        String serialNo = upacage(serialNoCell.toString().trim());
                        if (serialNo.toString().length() <= 24) {// 跟数据库长度有关
                            saveData(shop_id, serialNo, price);
                        }
                    }
                }
            }
            flag = true;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (null != fis) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return flag;
    }

    /**
     * 保存数据到库
     *
     * @param serialNo
     * @param price
     */
    private void saveData(long shop_id, String serialNo, int price) {
        Product p = pDao.geProduct(serialNo);
        Item it = new Item();
        it.setShop_id(shop_id);
        it.setSerialNo(serialNo);
        it.setName(p == null ? shop_id + "" : p.getName());
        it.setPrice(price == 0 ? p.getPrice() : price);
        it.setCount(1000);
        it.setCategory_id(p == null ? 28 : p.getCategory_id());
        it.setPic_url(p == null ? "" : p.getPic_url() == null ? "" : p.getPic_url());
        it.setScore(p == null ? 0 : p.getScore());
        LoggerUtils.getInstance().log(" 产品名称:\t" + it.getName() + "\t价格:\t" + it.getPrice());
        itemDao.insert(SUtils.generTableName(shop_id), it);
    }

    /**
     * 获取UUID文件名
     *
     * @param originFileName
     * @return shop_id + "_" + fileName + UUID + suffix
     * @author zhiaoxiufei
     */
    @SuppressWarnings("unused")
    private String getUUIDFileName(long shop_id, String originFileName) {
        int index = originFileName.lastIndexOf(".");
        String fileName = originFileName.substring(0, index);
        String suffix = originFileName.substring(index, originFileName.length());
        return fileName = shop_id + "_" + fileName + UUID.randomUUID().toString().replace("-", "") + suffix;
    }

    /**
     * 返回有效数值 [0] 条码  [1]价格
     *
     * @param arr
     * @return
     */
    @SuppressWarnings("unused")
    private String[] getValiValue(String[] arr) {
        String[] tempArr = new String[2];
        int temp = 0;    //只取前两个有效数据  第一个 为条码 第二个为价格
        for (int i = 0; i < arr.length; i++) {
            if (!StringUtils.isBlank(arr[i]) && temp == 0) {
                tempArr[0] = upacage(arr[i].trim());//去除空白和开头的0
                temp = 1;
                continue;
            }
            if (!StringUtils.isBlank(arr[i]) && temp == 1) {
                tempArr[1] = arr[i].trim();
                temp = 0;
                break;
            }
        }
        return tempArr;
    }

    /**
     * 上传支持的文件类型
     *
     * @param contentType
     * @return
     */
    @SuppressWarnings("unused")
    private boolean valiContentType(String contentType) {
        if (MimeTypeUtils.TEXT_PLAIN.equals(contentType))
            return true;
        if (MimeTypeUtils.APPLICATION_EXCEL_2003_2007.equals(contentType))
            return true;
        if (MimeTypeUtils.APPLICATION_EXCEL_2010_2013.equals(contentType))
            return true;
        return false;
    }

    /**
     * 去掉开头的0
     *
     * @param serialNo
     * @return
     */
    private String upacage(String serialNo) {
        while (serialNo.startsWith("0")) {
            serialNo = serialNo.substring(1, serialNo.length());
        }
        return serialNo;
    }

}

