package com.qunar.sg.controllers.suggestion;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.qunar.sg.Exception.IllegalKeysException;
import com.qunar.sg.bean.SDoc;
import com.qunar.sg.dao.SuggestionDAO;
import com.qunar.sg.services.TrietreeGroupService;
import com.qunar.sg.utils.Constants;
import com.qunar.sg.utils.Constants.ErrorCode;
import com.qunar.sg.utils.MessageUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Head;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Path("")
public class IndexController {
   

	private static final Logger logger = Logger.getLogger(IndexController.class);
	@Autowired
	public TrietreeGroupService tr;
	
	
	@Autowired
	public com.qunar.sg.dao.CommunityDAO communityDao;
	
	@Head("")
	@Get("")
	@Post("")
	public String ok(@Param("key")  String key, @Param("uuid") long uuid) {
		return "@OK";
	}
	
	@Get("act")
	@Post("act")
	public String act(@Param("pass") String pass, @Param("u") long u) {
		if (!"hello_qpl".equals(pass) || 256 != u){
            return "@" + MessageUtils.formErrorMessage(ErrorCode.ILLEGAL_PARAMTERS);
        }
		tr.reload();
		return "@OK";
	}


	@Get("query")
	@Post("query")
	public String query(Invocation inv, @Param("q") String q, @Param("count") int count,@Param("shop_id") long shop_id ) {

		if (0 == count || count > 20) {
			count = 20;
		}
		JSONArray ls = new JSONArray();
		if (StringUtils.isEmpty(q)) {
			return "@" + MessageUtils.formResponse(ls);
		}
		List<SDoc> lsdoc;
		try {
			lsdoc = tr.find( q, count);
		} catch (IllegalKeysException e) {
			e.printStackTrace();
			return "@" + MessageUtils.formResponse(ls);
		}

		for (SDoc doc : lsdoc) {
			JSONObject jb = new JSONObject();
			jb.put("key", doc.getWord());
			jb.put("id", doc.getId());
			ls.add(jb);
		}
		return "@" + MessageUtils.formResponse(ls);
	}

	@Get("del")
	@Post("del")
	protected String del(@Param("shop_id") long shop_id ,String key, long uuid) {
		String re = String.format(Constants.ERROR, 0, "do nothing");
		return re;

	}
	
	

}
