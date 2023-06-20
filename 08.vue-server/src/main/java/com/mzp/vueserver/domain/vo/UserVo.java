package com.mzp.vueserver.domain.vo;

import com.mzp.vueserver.enums.GenderEnum;
import com.mzp.vueserver.enums.StatusEnum;
import lombok.Data;

import java.util.Date;

@Data
public class UserVo {

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
     * 用户登录页面唯一标识
     */
    private String uuid;

    /**
     * 验证码
     */
    private String code;

}
