package com.mzp.vueserver.utils;

import io.jsonwebtoken.*;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;

/**
 * JWT工具类
 */
public class JwtUtil {

    /**
     * 有效期为 60 * 60 * 1000
     */
    private static final Long JWT_TTL = 60 * 60 * 1000L;

    private static final Long ADVANCE_EXPIRE_TIME = 5 * 60 * 1000L;

    /**
     * 定义JWT的发布者，这里可以起项目的拥有者
     */
    private static final String TOKEN_ISSUER = "admin";
    /**
     * 定义JWT的有效时长 有效时间(分钟)
     */
    private static final int TOKEN_VERIFY_TIME = 30;
    /**
     * 定义允许刷新JWT的有效时长(在这个时间范围内，用户的JWT过期了，不需要重新登录，后台会给一个新的JWT给前端)
     * 允许过期时间(分钟)
     */
    private static final int ALLOW_EXPIRES_TIME = 60 * 24;


    /**
     * 设置秘钥明文
     */
    private static final String JWT_KEY = "maozp666";

    /**
     * 创建token
     *
     * @param id
     * @param subject
     * @param ttlMillis
     * @return
     */
    public static String createJWT(String id, String subject, Long ttlMillis) {

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if (ttlMillis == null) {
            ttlMillis = JwtUtil.JWT_TTL;
        }
        long expMillis = nowMillis + ttlMillis;
        Date expDate = new Date(expMillis);
        SecretKey secretKey = generalKey();

        JwtBuilder builder = Jwts.builder()
                .setId(id)              //唯一的ID
                .setSubject(subject)   // 主题  可以是JSON数据
                .setIssuer(TOKEN_ISSUER)     // 签发者
                .setIssuedAt(now)      // 签发时间
                .signWith(signatureAlgorithm, secretKey) //使用HS256对称加密算法签名, 第二个参数为秘钥
                .setExpiration(expDate);// 设置过期时间
        return builder.compact();
    }

    /**
     * 生成加密后的秘钥 secretKey
     *
     * @return
     */
    public static SecretKey generalKey() {
        byte[] encodedKey = Base64.getDecoder().decode(JwtUtil.JWT_KEY);
        return new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
    }

    /**
     * <pre>
     *  验证token是否失效
     *  true:过期   false:没过期
     * </pre>
     */
    public static Boolean isTokenExpired(String token) {
        try {
            final Date expiration = getExpirationDateFromToken(token);
            return expiration.before(new Date());
        } catch (ExpiredJwtException expiredJwtException) {
            return true;
        }
    }

    /**
     * 获取jwt失效时间
     */
    public static Date getExpirationDateFromToken(String token) {
        try {
            return getClaimFromToken(token).getExpiration();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 获取jwt的payload部分
     */
    public static Claims getClaimFromToken(String token) {
        try {
            SecretKey secretKey = generalKey();
            return Jwts.parser()   //得到DefaultJwtParser
                    .setSigningKey(secretKey)  //设置签名的秘钥
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedJwtException e) {
            throw new RuntimeException(e);
        } catch (MalformedJwtException e) {
            throw new RuntimeException(e);
        } catch (SignatureException e) {
            throw new RuntimeException(e);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 检查当前token是否还能继续使用
     * true：可以  false：不建议
     *
     * @param token
     * @return
     */
    public static boolean checkToken(String token) {
        SecretKey secretKey = generalKey();
        try {
            // jwt正常情况 则判断失效时间是否大于5分钟
            long expireTime = Jwts.parser()   //得到DefaultJwtParser
                    .setSigningKey(secretKey)  //设置签名的秘钥
                    .parseClaimsJws(token)
                    .getBody().getExpiration().getTime();
            long diff = expireTime - System.currentTimeMillis();
            //如果有效期小于5分钟，则不建议继续使用该token
            if (diff < ADVANCE_EXPIRE_TIME) {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
        return true;
    }


}
