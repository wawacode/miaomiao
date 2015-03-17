package com.qunar.sg.services;

import com.qunar.sg.Exception.IllegalKeysException;
import com.qunar.sg.dao.ShopDAO;
import com.qunar.sg.bean.SDoc;
import com.qunar.sg.bean.Shop;
import com.qunar.sg.dao.SuggestionDAO;
import org.apache.commons.lang.StringUtils;
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
    @Autowired
    public com.qunar.sg.dao.CommunityDAO communityDao;

	private static final Logger logger = Logger.getLogger(TrietreeGroupService.class);
	public Map<String,  TrietreeService> trietMap = new ConcurrentHashMap<String,  TrietreeService>();

    @PostConstruct
	public void init() {
        System.out.println( "init ...");
            System.out.println("init ...cmmy " );
            TrietreeService tservice =  new   TrietreeService();
            tservice.init(communityDao,"cmmy");
            trietMap.put("cmmy" ,tservice);
	}



    public void reload(){
        Set<TrietreeService>  ls = (Set<TrietreeService>) trietMap.values();
        for (TrietreeService ts : ls ){
            ts.reload();
        }
    }

    public List<SDoc> find(String key, int count) throws IllegalKeysException {
        TrietreeService tr = trietMap.get("cmmy") ;
        if (null == tr) {
            System.out.println(" tr is null");
            return Collections.EMPTY_LIST;
        }
        return tr.find(key,count);

    }

}
