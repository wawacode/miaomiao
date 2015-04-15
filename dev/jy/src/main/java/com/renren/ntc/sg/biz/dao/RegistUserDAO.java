package com.renren.ntc.sg.biz.dao;

import java.util.Date;
import java.util.List;

import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;
import net.paoding.rose.jade.annotation.SQLParam;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.RegistUser;


@DAO(catalog = "ABC")
public interface RegistUserDAO {
    static final String TABLE_NAME = "regist_user";
    static final String FIELDS = "id, name,phone ,enable,type,pwd ,create_time,update_time";
    static final String INSERT_FIELDS = "name,phone,enable,type,pwd ";

    @SQL("select " + FIELDS + " from " + TABLE_NAME + "  where id =:1")
    public RegistUser getUser(long user_id);

    @SQL("select " + FIELDS + " from " + TABLE_NAME + "  where name =:1")
    public RegistUser getUserbyName(String name);

    @SQL("select " + FIELDS + " from " + TABLE_NAME + "  where phone =:1")
    public RegistUser getUserbyPhone(String phone);

    @ReturnGeneratedKeys
    @SQL("insert into  " + TABLE_NAME + " (" + INSERT_FIELDS + ") values (:1.name,:1.phone,:1.enable,:1.type,:1.pwd)")
    public long createUser(RegistUser user);


    @SQL("select " + FIELDS + " from " + TABLE_NAME + "  where phone =:1 and pwd =:2")
    public RegistUser getUser(String phone, String pwd);

    @SQL("select " + FIELDS + " from " + TABLE_NAME + "  where phone =:1 ")
    public RegistUser getUser(String shop_tel);

    @SQL("update " + TABLE_NAME + " set pwd=:2  where phone =:1")
    public int updatePwd(String phone, String new_pwd);

    /**
     * 查询注册用户(分页)
     *
     * @param from
     * @param offset
     * @return
     * @author ZhaoXiuFei
     * @date 2015年4月10日下午2:52:49
     */
    @SQL("select " + FIELDS + "  from " + TABLE_NAME + " order by id desc limit :1,:2")
    public List<RegistUser> getAllUser(int from, int offset);

    /**
     * 更新
     *
     * @param tableName
     * @param id
     * @param key
     * @param value
     * @return
     * @author ZhaoXiuFei
     * @date 2015年4月11日下午9:44:23
     */
    @SQL("update  ##(:tableName) set ##(:key) = :4, update_time = :5 where id =:2")
    public int update(@SQLParam("tableName") String tableName, long id, @SQLParam("key") String key, String value, Date update_time);

    /**
     * 删除注册用户
     *
     * @param tableName
     * @param user_id
     * @author ZhaoXiuFei
     * @date 2015年4月11日下午10:17:09
     */
    @SQL("DELETE FROM ##(:tableName) WHERE id=:2")
    public int del(@SQLParam("tableName") String tableName, long user_id);

    /**
     * 高级查询 (支持用户名和电话号码模糊查询)
     *
     * @param tableName
     * @param value
     * @param from
     * @param offset
     * @return
     * @author ZhaoXiuFei
     * @date 2015年4月12日上午12:54:45
     */
    @SQL("select " + FIELDS + " from  ##(:tableName)   where  name like :2 or phone like :2 order by id desc limit :3 , :4")
    public List<RegistUser> advSearch(@SQLParam("tableName") String tableName, String value, int from, int offset);
}
