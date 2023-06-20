package com.mzp.vueserver.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.mzp.vueserver.domain.entity.Auth;
import com.mzp.vueserver.domain.entity.User;
import com.mzp.vueserver.domain.vo.UserVo;

import java.util.List;

/**
 * <p>
 * 权限 服务类
 * </p>
 *
 * @author maozp
 * @since 2023-05-04
 */
public interface AuthService extends IService<Auth> {


    List<Auth> selectAuthsByUserId(Integer uId);
}
