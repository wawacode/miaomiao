package com.renren.ntc.sg.threads;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * 异步任务执行器
 *
 * @param <P> 标准化的请求参数类型
 * @param <T> 标准化的响应数据类型
 * @author debug
 */
public class WrapperThread<P, T> implements Runnable {
    private static final Logger logger = LoggerFactory.getLogger(WrapperThread.class);
    /**
     * 未完成的任务数引用
     */
    private final AtomicInteger wait;
    /**
     * 标准化的请求参数
     */
    private final P param;
    /**
     * 标准化的响应数据
     */
    private T result;
    /**
     * 任务的超时时间
     */
    private final long singleTaskMaxTimeMillis;
    /**
     * 合作方API访问器
     */
    private ApiAccess<P, T> task = null;

    /**
     * 初始化
     *
     * @param wait                    未完成的任务数引用
     * @param singleTaskMaxTimeMillis 任务的超时时间
     * @param param                   标准化的请求参数
     * @param task                    合作方API访问器
     */
    public WrapperThread(AtomicInteger wait, long singleTaskMaxTimeMillis, P param, ApiAccess<P, T> task) {
        this.wait = wait;
        this.singleTaskMaxTimeMillis = singleTaskMaxTimeMillis;
        this.param = param;
        this.task = task;
    }

    @Override
    public void run() {
        if (wait.get() > 0) {
            try {
                if (task != null) {
                    result = task.access(param, singleTaskMaxTimeMillis);
                }
            } catch (Throwable t) {
                logger.warn(String.format("Task  : %s  failed.", this.task.toString()), t);
            } finally {
                done();
            }
        }
    }

    /**
     * 取得标准化的响应数据
     *
     * @return 标准化的响应数据
     */
    public T getResult() {
        return result;
    }

    /**
     * 标记任务结束
     */
    public void done() {
        wait.decrementAndGet();
        synchronized (wait) {
            wait.notifyAll();
        }
    }

    /**
     * 标记任务被驳回
     */
    public void onRejected() {
        try {
            if (task != null) {
                task.onRejected(param);
            }
        } catch (Throwable t) {
            logger.warn("Task mark reject failed.", t);
        } finally {
            done();
        }
    }
}
