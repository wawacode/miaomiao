package com.renren.ntc.sg.threads;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.Future;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import com.renren.ntc.sg.service.LoggerUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class ExecutorServiceGroup<P, T> {

	private Map<String, ThreadPoolExecutor> map = new HashMap<String, ThreadPoolExecutor>();

	private boolean isShutdown = false;

	private Random random = new Random();

	private static final Logger logger = LoggerFactory.getLogger(ExecutorServiceGroup.class);

	private static String WORKPOOL = "WORKPOOL_";

	private static int POOLSIZE = 2;

	public ExecutorServiceGroup() {

		for (int i = 0; i < POOLSIZE; i++) {

			ThreadPoolExecutor pool = new ThreadPoolExecutor(100, 400, 10, TimeUnit.MINUTES,
					new ArrayBlockingQueue<Runnable>(50), new ThreadFactory() {
						private int i;

						@Override
						public Thread newThread(Runnable r) {
							return new Thread(r, String.format("WrapperThreadOne-%d", i++));
						}
					}, new RejectedExecutionHandler() {
						@Override
						public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
                            LoggerUtils.getInstance().log ("order queue over load ...");
						}

					});

			String key = generKey(WORKPOOL, i);
			map.put(key, pool);
			logger.info(String.format(" add %s  to poolgroup ", key));
		}
	}

	private String generKey(String pre, int i) {
		StringBuffer sb = new StringBuffer();
		sb.append(pre);
		sb.append(i);
		return sb.toString();
	}

	public void shutdown() {
		isShutdown = true;
		Collection<ThreadPoolExecutor> pools = map.values();
		Iterator<ThreadPoolExecutor> it = pools.iterator();
		while (it.hasNext()) {
			it.next().shutdown();
		}
	}

	public Future<?> submit(WrapperThread<P, T> worker) {
		String key = generKey(WORKPOOL, random(POOLSIZE));
		ThreadPoolExecutor pool = map.get(key);
		return pool.submit(worker);
	}

	private int random(int size) {
		int num = random.nextInt(size);
		return num;
	}


	public boolean isShutdown() {
		return isShutdown;
	}

	
	public  static void main (String [] args ){
		ExecutorServiceGroup eg =  new ExecutorServiceGroup();
		for (int i=0 ;i<1000 ;i++){
		  System.out.println(eg.random(POOLSIZE));
		}
	}
}
