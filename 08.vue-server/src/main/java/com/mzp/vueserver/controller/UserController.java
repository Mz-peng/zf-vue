package com.mzp.vueserver.controller;

import cn.hutool.core.lang.UUID;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.mzp.vueserver.domain.R;
import com.mzp.vueserver.domain.ResultStatusEnum;
import com.mzp.vueserver.domain.entity.Auth;
import com.mzp.vueserver.domain.entity.User;
import com.mzp.vueserver.domain.vo.LoginInfo;
import com.mzp.vueserver.domain.vo.UserVo;
import com.mzp.vueserver.exception.BizException;
import com.mzp.vueserver.service.AuthService;
import com.mzp.vueserver.service.UserService;
import com.mzp.vueserver.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 用户
 *
 * @author maozp
 * @since 2023-05-04
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    private static final String AUTHORIZE_TOKEN = "Authorization";

    /**
     * jwt 前缀
     */
    private static final String TOKEN_PREFIX = "Bearer ";

    /**
     * 注册用户信息
     *
     * @param userVo
     * @return
     */
    @PostMapping("/reg")
    public R<String> reg(@RequestBody UserVo userVo) {
        userService.reg(userVo);
        return R.ok("注册成功！");
    }

    /**
     * 登录
     *
     * @param userVo
     * @return
     */
    @PostMapping("/login")
    public R<LoginInfo> login(@RequestBody UserVo userVo) {
        // 查询用户信息
        User user = userService.login(userVo);

        // 查询用户权限
        List<Auth> auths = authService.selectAuthsByUserId(user.getUId());

        LoginInfo loginInfo = new LoginInfo();
        loginInfo.setUId(user.getUId());
        loginInfo.setAuths(auths);
        loginInfo.setUsername(user.getUsername());
        loginInfo.setToken(JwtUtil.createJWT(UUID.fastUUID().toString(), JSONUtil.toJsonStr(loginInfo), null));
        return R.ok(loginInfo, "登录成功");
    }


    /**
     * 校验token是否有效
     *
     * @return
     */
    @PostMapping("/validate")
    public R<LoginInfo> validate(HttpServletRequest request) {

        //2. 请求头中获取令牌
        String token = request.getHeader(AUTHORIZE_TOKEN);


        //3. 判断请求头中是否有令牌，校验令牌是否有效
        if (StrUtil.isBlank(token) || JwtUtil.isTokenExpired(token.replace(TOKEN_PREFIX, ""))) {
            throw new BizException(ResultStatusEnum.UNAUTHORIZED);
        }

        String subject = JwtUtil.getClaimFromToken(token.replace(TOKEN_PREFIX, "")).getSubject();
        try {
            LoginInfo loginInfo = JSONUtil.toBean(subject, LoginInfo.class);
            loginInfo.setToken(JwtUtil.createJWT(UUID.fastUUID().toString(), subject, null));
            return R.ok(loginInfo, "登录成功");
        } catch (Exception e) {
            throw new BizException(ResultStatusEnum.UNAUTHORIZED);
        }



    }


}
