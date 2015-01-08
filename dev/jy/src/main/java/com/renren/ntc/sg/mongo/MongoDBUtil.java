package com.renren.ntc.sg.mongo;

import java.net.UnknownHostException;
import java.util.Collections;
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


    private static boolean reCheck(WriteResult re) {
		if (null == re.getError()) {
			return true;
		}
		return false;
	}
	public static void main(String[] args) throws UnknownHostException,
			MongoException {

		MongoDBUtil mongoDBUtil = MongoDBUtil.getInstance();
		DBCollection coll = mongoDBUtil.getCollection();
        BasicDBObject query = new BasicDBObject();
        query.put("key", "1233");
        BasicDBObject foj = new BasicDBObject("key", "1223");
        foj.put("ccc","ddd");
        BasicDBObject tbj = new BasicDBObject();
        tbj.put("$addToSet", new BasicDBObject("sg_shop", foj));
        WriteResult re = coll.update(query, tbj, true, false);
       System.out.println( reCheck(re));


        DBCursor cur = coll.find(query);
		BasicDBObject boj = null;

		if (cur.hasNext()) {
			boj = (BasicDBObject) cur.next();
            System.out.println(boj.toString());
		}

    }

}
	