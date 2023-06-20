package com.mzp.vueserver.domain.vo;

import com.mzp.vueserver.domain.entity.Auth;
import lombok.Data;

import java.util.List;

/**
 * 登录成功返回用户的信息
 */
@Data
public class LoginInfo {

    /**
     * 主键
     */
    private Integer uId;

    /**
     * 用户名
     */
    private String username;

    /**
     * 登录凭证
     */
    private String token;

    /**
     * 用户权限
     */
    private List<Auth> auths;

}
