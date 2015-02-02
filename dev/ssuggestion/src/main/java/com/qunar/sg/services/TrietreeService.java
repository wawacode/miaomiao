package com.qunar.sg.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.qunar.sg.Exception.IllegalKeysException;
import com.qunar.sg.dao.SuggestionDAO;
import com.qunar.sg.bean.Count;
import com.qunar.sg.bean.SDoc;
import com.qunar.sg.utils.Constants;

public class TrietreeService {

	private static final Logger logger = Logger.getLogger(TrietreeService.class);

    private SuggestionDAO  suggest ;
	public Map<Long, SDoc> result = new ConcurrentHashMap<Long, SDoc>();
	
	private Timer timer;

	public Node root;

    private long shop_id;

    @PostConstruct
	public void init(SuggestionDAO  suggest, long shop_id) {
        this.suggest = suggest;
        this.shop_id = shop_id;
		load(this.shop_id);
		timer = new Timer();
        timer.schedule(new ReLoadTask(this.shop_id),leftime() , Constants.ONEDAY);
	}
	
	
	private long  leftime() {
		long now = System.currentTimeMillis();
		Calendar cal = Calendar.getInstance(); 
		Date date = new Date(); 
		cal.setTimeInMillis(now);
		cal.add(cal.DATE, 1);
		cal.set(cal.HOUR, 1);
		long delay = cal.getTimeInMillis();
		return (delay-now);
	}

    public void reload(){
    	load(this.shop_id);
    }
	private void load(long shop_id) {
		Count co = suggest.getCount(shop_id);
		int  count = co.getCount();
		for (int i = 0; i < count; i = i + Constants.COUNT) {
			List<SDoc> ldoc = suggest.getDoc(i, Constants.COUNT,shop_id);
			for (SDoc doc : ldoc) {
				try {
					addKey(doc);
				} catch (IllegalKeysException e) {
					e.printStackTrace();
					continue;
				}
			}
		}
	}

	class ReLoadTask extends TimerTask {
        private final long shop_id;

        ReLoadTask(long shop_id){
           this.shop_id = shop_id;
        }
        public void run() {
        	reload();
        }
    }
	


	class Node {

		int key = 0;

		public Node[] childrens;
		public List<Long> docs;

		public Node() {
			docs = new ArrayList<Long>();
			// ascii 32~ 90
			childrens = new Node[59];
		}

		public int getKey() {
			return key;
		}

		public void setKey(int key) {
			this.key = key;
		}

	}

	public TrietreeService() {
		root = new Node();
	}

	public void addKey(SDoc doc) throws IllegalKeysException {
		synchronized(this){
		  addKey(doc, root);
		}
	}

	private List<Long> find(String key, int offset, int count) throws IllegalKeysException {
		Node node = this.root;
		StringBuffer sb = topingyin(key);
		int len = sb.length();
		for (int i = 0; i < len; i++) {
			char c = sb.charAt(i);
			int of = getOffset(c);
		
			Node no = node.childrens[of];
			if (null == no) {
				if (node == this.root) {
					return Collections.EMPTY_LIST;
				}
				return node.docs;
			}
			if (i == (len - 1)) {
				if(logger.isDebugEnabled()){
				   logger.debug(String.format("match key %s  %s", no.key,no.docs));
				}
				return no.docs;
			}
			node = no;
		}
		return Collections.EMPTY_LIST;
	}

	private int getOffset(char c) {
		int of = c - ' ';
		//only support ac 32～90
		if (of < 0 || of > 58){
			of = 0;
		} 
		return of;
	}

	public List<SDoc> find(String key, int count) throws IllegalKeysException {
		key = UpperCase(key);
		List<SDoc> dls = new ArrayList<SDoc>();
		List<Long> ls = find(key, 0, count);
		
		for (long id : ls) {
			SDoc d = result.get(id);
			if (null != d) {
				if(logger.isDebugEnabled()){
					logger.debug(String.format("key %s find  uuid %d ",key,d.getId()));
				}
				dls.add(d);
				if (dls.size() == count) {
					return dls;
				}
			}
		}
		return dls;

	}

	private String UpperCase(String key) {
		return key.toUpperCase();
	}
    //这个逻辑很关键 Long docId
	private void remove(Long docId, Node node) throws IllegalKeysException {
		if (null == result.get(docId)) {
			if (logger.isDebugEnabled()) {
				logger.debug(String.format("remove null == result.get(docId)  docId %d  ", docId));
			}
			return;
		}
		boolean conti = true;
		while (has(node)&& conti) {
			conti = false;
			for (Node n : node.childrens) {
				if (null != n && null != n.docs && n.docs.contains(docId)) {
					n.docs.remove(docId);
					if(logger.isDebugEnabled()){
					   logger.debug(String.format("key %s remove  %d ",n.getKey(),docId));
					}
					node = n;
					conti = true;
					break;
				}
			}
		}
		result.remove(docId);
	}

	private boolean has(Node node) {
		for (Node n : node.childrens){
			if (n != null){
				return true;
			}
		}
		return false;
	}


	private void addKey(SDoc doc, Node node) throws IllegalKeysException {
		if(StringUtils.isEmpty(doc.getWord())||doc.getId()< 0){
			logger.warn(String.format(" fail to add   key %s  uuid %d ",
					doc.getWord(), doc.getId()));
			return ;
		}

		if (result.containsKey(doc.getId())) {
			// update
			remove(doc.getId(), root);
		}
		result.put(doc.getId(), doc);

		StringBuffer sb = topingyin(UpperCase(doc.getWord()));
		int len = sb.length();
		for (int i = 0; i < len; i++) {
			char c = sb.charAt(i);
			int offset = getOffset(c);
			Node no = node.childrens[offset];
			if (null == no) {
				no = new Node();
				node.childrens[offset] = no;
				logger.debug(String.format("create node uuid  %d  key %s   node.childrens[ %d ] ", doc.getId(),
						doc.getWord(), offset));
			}
			no.docs.add(doc.getId());
			node = no;
		}
		logger.info(String.format("add to  add key %s  uuid %d ", doc.getWord(), doc.getId()));
	}

	private StringBuffer topingyin(String key) throws IllegalKeysException {
		StringBuffer sb = new StringBuffer();
		if (StringUtils.isEmpty(key)) {
			return sb;
		}

		char[] chars = key.toCharArray();
		HanyuPinyinOutputFormat outputFormat = new HanyuPinyinOutputFormat();
		outputFormat.setCaseType(HanyuPinyinCaseType.UPPERCASE);
		outputFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
		outputFormat.setVCharType(HanyuPinyinVCharType.WITH_V);
		for (char c : chars) {
			// 识别汉字
			if ((c >= 0x4e00) && (c <= 0x9fbb)) {
				try {
					String[] pinyin = PinyinHelper.toHanyuPinyinStringArray(c, outputFormat);
					if (illegal(pinyin)) {
						throw new IllegalKeysException(String.format("fail to paser key  %s ", key));
					}
					sb.append(pinyin[0]);

				} catch (BadHanyuPinyinOutputFormatCombination e) {
					e.printStackTrace();
					throw new IllegalKeysException(String.format("fail to add key  %s reson: %s", key, e.getMessage()));
				}
			} else {
				sb.append(c);
			}

		}
		return sb;
	}

	private boolean illegal(String[] pinyin) {
		if(null == pinyin[0]){
			return true;
		}
		return false;
	}

	private void preProcess(SDoc doc) {
	
	}

	/**
	 * @param args
	 * @throws IllegalKeysException
	 */
	public static void main(String[] args) throws IllegalKeysException {
		TrietreeService tree = new TrietreeService();
		
//		tree.addKey(new SDoc( 1071L , "西街"));
//		tree.addKey(new SDoc( 1072L , "西街1"));
//		tree.addKey(new SDoc( 1072L , "西街1"));
//		tree.addKey(new SDoc( 1078L , "西街1"));
//		tree.addKey(new SDoc( 1072L , "西街1"));
//		tree.addKey(new SDoc( 1075L , "汤口镇沿西"));
		SDoc sdoc = new SDoc();
		sdoc.setId( 1075L);
		sdoc.setWord( "麦当劳");
		tree.addKey(sdoc);
		tree.addKey(sdoc);
		

		List<SDoc> ls = tree.find("mai", 10);
		for (SDoc doc : ls) {
			logger.info(String.format("re %s  %d ", doc.getWord(), doc.getId()));
		}
		logger.info("------------------------------");
		ls = tree.find("k", 10);
		for (SDoc doc : ls) {
			logger.info(String.format("re %s  %d ", doc.getWord(), doc.getId()));
		}
		logger.info("------------------------------");
		ls = tree.find("b", 10);
		for (SDoc doc : ls) {
			logger.info(String.format("re %s  %d ", doc.getWord(), doc.getId()));
		}

	}

}
