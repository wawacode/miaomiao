package com.qunar.sg.services;

import com.qunar.sg.Exception.IllegalKeysException;
import com.qunar.sg.dao.ShopDAO;
import com.qunar.sg.bean.SDoc;
import com.qunar.sg.bean.Shop;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.annotation.PostConstruct;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TrietreeGroupService {

    @Autowired
    public ShopDAO shopDao ;

	private static final Logger logger = Logger.getLogger(TrietreeGroupService.class);
	public Map<Long,  TrietreeService> trietMap = new ConcurrentHashMap<Long,  TrietreeService>();

    @PostConstruct
	public void init() {
        List<Shop>  shopls= shopDao.getAllShopsByAudit(1);
        for (Shop shop :shopls){
        TrietreeService tservice =  new   TrietreeService();
        tservice.init(shop.getId());
        trietMap.put(shop.getId() ,tservice);
        }
	}



    public void reload(){
        Set<TrietreeService>  ls = (Set<TrietreeService>) trietMap.values();
        for (TrietreeService ts : ls ){
            ts.reload();
        }
    }
    public void addKey(long shop_id,SDoc doc) throws IllegalKeysException {
        TrietreeService tr = trietMap.get(shop_id) ;
        tr.addKey(doc);
    }

    public List<SDoc> find(long shop_id, String key, int count) throws IllegalKeysException {
        TrietreeService tr = trietMap.get(shop_id) ;
        return tr.find(key,count);

    }

}
