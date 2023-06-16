import store from "@/store";
import * as types from "@/store/action-types";
import router from "@/router/index";

/**
 * 登录权限校验
 * @param to
 * @param from
 * @param next
 */
const loginPermission = async function (to, from, next) {
    // 验证是否登录过，如果登录过，刷新用户的登录信息和token
    let loginStatus = await store.dispatch(`user/${types.USER_VALIDATE}`);
    // 跳转该路由是否需要登录 设置在路由的 meta 属性中
    let needLogin = to.matched.some((item) => item.meta.needLogin);

    if (store.state.user.hasPermission) {
        // 已登录
        if (to.path === "/login") {
            // 已登录还跳转登录页面，让他去首页
            next("/");
        } else {
            next();
        }
    } else {
        // 未登录 判断路由是否需要登录
        if (needLogin) {
            if (loginStatus) {
                // 需要登录，本次登录过了，放行
                next();
            } else {
                next("/login");
            }
        } else {
            // 没登录，也不需要权限
            next();
        }
    }
};

// 权限校验动态添加
const menuPermission = async function (to, from, next) {
    if (store.state.user.hasPermission) {
        // 添加路由 需要判断是否添加过路由了
        if (!store.state.user.menuPermission) {
            await store.dispatch(`user/${types.ADD_ROUTE}`);
            // replaceState
            next({ ...to, replace: true }); // 进入页面时 404
        } else {
            next();
        }
    } else {
        next();
    }
};

/**
 * 登录后，判断是否需要创建websocket
 * @param to
 * @param from
 * @param next
 * @returns {Promise<void>}
 */
export const createWebSocket = async function (to, from, next) {
    // 如果登录了，但是没有创建websocket
    if (store.state.user.hasPermission && !store.state.ws) {
        await store.dispatch(`${types.CREATE_WEBSOCKET}`);
        next();
    } else {
        next();
    }
};

export default {
    loginPermission,
    menuPermission,
    createWebSocket,
};
