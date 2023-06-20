package com.mzp.vueserver.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.crypto.digest.BCrypt;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mzp.vueserver.domain.entity.User;
import com.mzp.vueserver.domain.vo.UserVo;
import com.mzp.vueserver.enums.StatusEnum;
import com.mzp.vueserver.exception.BizException;
import com.mzp.vueserver.mapper.UserMapper;
import com.mzp.vueserver.service.UserService;
import com.mzp.vueserver.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户 服务实现类
 * </p>
 *
 * @author maozp
 * @since 2023-05-04
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    private RedisUtil redisUtil;

    @Override
    public void reg(UserVo userVo) {

        String username = userVo.getUsername();
        Long count = this.baseMapper.selectCount(Wrappers.lambdaQuery(User.class).eq(User::getUsername, username));
        if (count > 0) {
            throw new BizException("用户已存在!");
        }

        User user = new User();
        BeanUtil.copyProperties(userVo, user);
        // BCrypt 加密
        String gensalt = BCrypt.gensalt();
        String hashpwed = BCrypt.hashpw(user.getPassword(), gensalt);
        user.setPassword(hashpwed);

        // 查询用户的权限


        this.baseMapper.insert(user);

    }

    @Override
    public User login(UserVo userVo) {

        if (!userVo.getCode().equals(redisUtil.get(userVo.getUuid()))) {
            throw new BizException("验证码错误");
        }

        User user = this.baseMapper.selectOne(Wrappers.lambdaQuery(User.class)
                .eq(User::getUsername, userVo.getUsername()));

        if (user == null) {
            throw new BizException("用户不存在");
        }

        if (StatusEnum.DISABLED.equals(user.getStatus())) {
            throw new BizException("用户已禁用");
        }

        boolean checkpw = BCrypt.checkpw(userVo.getPassword(), user.getPassword());
        if (!checkpw) {
            throw new BizException("密码错误");
        }

        user.setPassword(null);

        return user;
    }
}
