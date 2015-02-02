package com.renren.ntc.sg.mongo;

import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.Set;

import com.renren.ntc.sg.util.Constants;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;
import com.mongodb.WriteResult;


/**
 * @author allen
 *
 */
//todo  mongo db 这些代码都需要优化
public class MongoDBUtil {

	private Mongo m;
	private DB db;

	static Log logger = LogFactory.getLog(MongoDBUtil.class);

	private static MongoDBUtil instance = new MongoDBUtil();

	private MongoDBUtil() {
		try {
			m = new Mongo(Constants.HOST, 27017);
			db = m.getDB(Constants.DBNAME);
            boolean  result = db.authenticate("sg","qwer$#@!".toCharArray());
            System.out.println("re "  + result);

		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
	}

	public static MongoDBUtil getInstance() {
		return instance;
	}

    public DB getDB() {
        return db;
    }

    public DBCollection getCollection() {
        return db.getCollection("sg_shop");
    }


    public DBCollection getCollectionforcache() {
        return db.getCollection("sg_cache");
    }


    private static boolean reCheck(WriteResult re) {
		if (null == re.getError()) {
			return true;
		}
		return false;
	}
	public static void main(String[] args) throws UnknownHostException,
			MongoException {

		MongoDBUtil mongoDBUtil = MongoDBUtil.getInstance();
		DBCollection coll = mongoDBUtil.getCollectionforcache();
        BasicDBObject query = new BasicDBObject();
//        query.put("key", "1223");
//        BasicDBObject foj = new BasicDBObject("key", "12323");
//        foj.put("ccc","ddd");
//        BasicDBObject tbj = new BasicDBObject();
//        tbj.put("$addToSet", new BasicDBObject("data", foj));
//        WriteResult re = coll.update(query, tbj, true, false);
//        System.out.println( reCheck(re));
//
        query = new BasicDBObject();
        query.put("key", "1223");
        DBCursor cur = coll.find(query);
		BasicDBObject boj = null;

		if (cur.hasNext()) {
			boj = (BasicDBObject) cur.next();
            System.out.println(boj.toString());
		}
        Date date =  new Date();
        SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd");
        String dat  =  sFormat.format(date);

        String key = "message" + "#" + "18600326217" +"#"+ dat;
        query = new BasicDBObject();
        query.put("key", key);
        BasicDBObject foj = new BasicDBObject("ke4y", "12333323");
        System.out.println(coll.update(query,foj));

    }

}
	