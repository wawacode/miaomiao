package com.qunar.quzilla.services;

import com.qunar.quzilla.Exception.IllegalKeysException;
import com.qunar.quzilla.dao.SuggestionDAO;
import com.qunar.quzilla.pojo.Count;
import com.qunar.quzilla.pojo.SDoc;
import com.qunar.quzilla.utils.Constants;
import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TrietreeServiceGroup {

	private static final Logger logger = Logger.getLogger(TrietreeServiceGroup.class);
	public Map<Long,  TrietreeService> trietMap = new ConcurrentHashMap<Long,  TrietreeService>();

    @PostConstruct
	public void init() {

        for (){
        TrietreeService tservice =  new   TrietreeService();
        trietMap.put(Shop ,tservice);
        }
	}



}
