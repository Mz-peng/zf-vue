package com.mzp.vueserver.controller;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.GifCaptcha;
import cn.hutool.captcha.ShearCaptcha;
import com.mzp.vueserver.domain.R;
import com.mzp.vueserver.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * 公用方法
 */
@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private RedisUtil redisUtil;

    /**
     * 获取验证码
     *
     * @param uid
     * @return
     */
    @GetMapping("/getCaptcha")
    public R<Map<String, String>> getCaptcha(@RequestParam("uid") String uid) {
        ShearCaptcha captcha = CaptchaUtil.createShearCaptcha(100, 40, 4, 4);
        String imageBase64 = captcha.getImageBase64();
        String code = captcha.getCode();
        // 把验证码存在redis
        redisUtil.setEx(uid, code, 5L, TimeUnit.MINUTES);

        Map<String, String> captchaMap = new HashMap<>();
        captchaMap.put("code", code);
        captchaMap.put("imageBase64", "data:text/html;base64," + imageBase64);

        return R.ok(captchaMap);
    }

}
