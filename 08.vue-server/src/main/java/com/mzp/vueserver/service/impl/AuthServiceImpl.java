package com.mzp.vueserver.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.crypto.digest.BCrypt;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mzp.vueserver.domain.entity.Auth;
import com.mzp.vueserver.domain.entity.User;
import com.mzp.vueserver.domain.vo.UserVo;
import com.mzp.vueserver.enums.StatusEnum;
import com.mzp.vueserver.exception.BizException;
import com.mzp.vueserver.mapper.AuthMapper;
import com.mzp.vueserver.mapper.UserMapper;
import com.mzp.vueserver.service.AuthService;
import com.mzp.vueserver.service.UserService;
import com.mzp.vueserver.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 权限 服务实现类
 * </p>
 *
 * @author maozp
 * @since 2023-05-04
 */
@Service
public class AuthServiceImpl extends ServiceImpl<AuthMapper, Auth> implements AuthService {


    @Override
    public List<Auth> selectAuthsByUserId(Integer uId) {
        return this.baseMapper.selectAuthsByUserId(uId);
    }
}
