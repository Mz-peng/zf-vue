package com.mzp.vueserver.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.mzp.vueserver.enums.GenderEnum;
import lombok.Data;

/**
 * @author maozp
 * @desc 权限
 * @date 2023年06月09日 0:05
 */
@Data
@TableName("auth")
public class Auth {

    /**
     * 主键
     */
    @TableId(value = "auth_id", type = IdType.AUTO)
    private Integer authId;

    /**
     * 权限名称
     */
    private String name;

    /**
     * 父id
     */
    private Integer pid;

    /**
     * 权限标识
     */
    private String auth;

    /**
     * 路径
     */
    private String path;

}
