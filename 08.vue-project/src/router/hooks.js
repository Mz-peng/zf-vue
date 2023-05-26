import store from "@/store";
import * as types from "@/store/action-types";

/**
 * 登录权限校验
 * @param to
 * @param from
 * @param next
 */
const loginPermission = async function (to, from, next) {
    console.log("loginPermission", this);
    await store.dispatch(`user/${types.USER_VALIDATE}`);
    next();
};

// 权限校验认证

export default {
    loginPermission,
};
