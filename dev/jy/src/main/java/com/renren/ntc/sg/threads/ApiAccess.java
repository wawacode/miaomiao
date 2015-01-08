package com.renren.ntc.sg.threads;

/**
 * 合作方API访问接口
 * 
 * @author debug
 * 
 * @param <P>
 *            标准化的请求参数类型
 * @param <T>
 *            标准化的响应数据类型
 */
public interface ApiAccess<P, T> {
	/**
	 * 访问合作方API并返回标准化的数据
	 * 
	 * @param param
	 *            标准化的请求参数
	 * @param maxTimeMillis
	 *            请求超时时间
	 * @return 标准化的响应数据<br>
	 *         请求超时或其他异常的情况:null
	 * @throws Exception
	 *             API访问异常
	 */
	T access(P param, long maxTimeMillis) throws Exception;

	/**
	 * 任务调度被驳回的处理
	 * 
	 * @param param
	 *            标准化的请求参数
	 * @throws Exception
	 *             处理异常
	 */
	void onRejected(P param) throws Exception;
}
