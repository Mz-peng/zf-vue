package com.mzp.vueserver.service;

import com.mzp.vueserver.domain.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;
import com.mzp.vueserver.domain.vo.LoginInfo;
import com.mzp.vueserver.domain.vo.UserVo;

/**
 * <p>
 * 用户 服务类
 * </p>
 *
 * @author maozp
 * @since 2023-05-04
 */
public interface UserService extends IService<User> {

    /**
     * 注册
     * @param userVo
     */
    void reg(UserVo userVo);

    /**
     * 登录
     * @param userVo
     * @return
     */
    User login(UserVo userVo);
}
