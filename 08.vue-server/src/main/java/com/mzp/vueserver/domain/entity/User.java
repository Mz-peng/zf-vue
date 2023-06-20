package com.mzp.vueserver.domain.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;

import com.mzp.vueserver.enums.GenderEnum;
import com.mzp.vueserver.enums.StatusEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 用户
 * </p>
 *
 * @author 
 * @since 2023-05-04
 */
@Getter
@Setter
@TableName(value ="user")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "u_id", type = IdType.AUTO)
    private Integer uId;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 昵称
     */
    private String name;

    /**
     * 性别
     */
    private GenderEnum gender;

    /**
     * 头像
     */
    private String avatar;

    /**
     * 状态
     */
    private StatusEnum status;

    /**
     * 注册账号时间
     */
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    /**
     * 最后更新时间
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;
}
