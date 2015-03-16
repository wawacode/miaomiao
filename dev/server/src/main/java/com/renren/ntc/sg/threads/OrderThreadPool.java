package com.renren.ntc.sg.threads;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 任务分发线程池
 *
 * @param <P> 标准化的请求参数类型
 * @param <T> 标准化的响应数据类型
 * @author debug
 */
public class OrderThreadPool<P, T> {
    private static final Logger LOGGER = LoggerFactory.getLogger(OrderThreadPool.class);

    /**
     * 当任务处理超时后，是否强制杀掉正在处理的子任务
     */
    private boolean forceKillRunningTaskWhenTimeout;
    /**
     * 单个任务的超时时间
     */
    private long singleTaskMaxTimeMillis;
    /**
     * 线程池
     */
    private ExecutorServiceGroup pool;

    public void setSingleTaskMaxTimeMillis(long singleTaskMaxTimeMillis) {
        this.singleTaskMaxTimeMillis = singleTaskMaxTimeMillis;
    }

    /**
     * 创建线程池
     */
    public OrderThreadPool() {
    	

    	pool = new ExecutorServiceGroup();
        singleTaskMaxTimeMillis = 2000L;
        // 打开此处开关时应【慎重】，若任务在某种不稳定的状态被终止，可能带来许多潜在问题，比如占用的资源无法正常被回收等
        forceKillRunningTaskWhenTimeout = true;
    }


    /**
     * 关闭线程池
     */
    public synchronized void shutdown() {
        if (pool != null) {
            pool.shutdown();
        }
    }
}
