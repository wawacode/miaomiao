package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.RegistUser;
import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;


@DAO(catalog = "ABC")
public interface RegistUserDAO {
    static final String TABLE_NAME= "regist_user";
    static final String FIELDS = "id, name,phone ,enable,type,pwd ,create_time,update_time" ;
    static final String INSERT_FIELDS = "name,phone,enable,type,pwd " ;

	@SQL("select "+ FIELDS +" from " + TABLE_NAME + "  where id =:1")
	public RegistUser getUser(long user_id);

    @SQL("select "+ FIELDS +" from " + TABLE_NAME + "  where name =:1")
    public RegistUser getUserbyName(String name);

    @SQL("select "+ FIELDS +" from " + TABLE_NAME + "  where phone =:1")
    public RegistUser getUserbyPhone(String phone);

    @ReturnGeneratedKeys
    @SQL("insert into  "  + TABLE_NAME + " (" + INSERT_FIELDS  +") values (:1.name,:1.enable,:1.type,:1.pwd)")
    public long  createUser(RegistUser user);


    @SQL("select "+ FIELDS +" from " + TABLE_NAME + "  where phone =:1 and pwd =:2")
    public RegistUser getUser(String phone, String pwd);
}
