import * as user from "@/api/user";
import * as types from "@/store/action-types";
import { getLocal, setLocal } from "@/utils/local";
import per from "@/router/permission";
import router from "@/router";

const filterRouter = (authList) => {
    // 后端返回的用户权限
    let auths = authList.map((auth) => auth.auth);

    /**
     * 过滤
     * @param routes 所有的路由
     */
    function iterFilter(routes) {
        return routes.filter((route) => {
            if (auths.includes(route.meta.auth)) {
                if (route.children) {
                    route.children = iterFilter(route.children);
                }
                return route;
            }
        });
    }
    return iterFilter(per);
};

export default {
    state: {
        userInfo: {}, //用户信息
        hasPermission: false, //用户权限
        menuPermission: false, //路由权限
    },
    mutations: {
        [types.SET_USER_INFO](state, userInfo) {
            state.userInfo = userInfo;
            if (userInfo && userInfo.token) {
                setLocal("token", userInfo.token);
            } else {
                localStorage.clear("token");
            }
        },
        [types.SET_PERMISSION](state, has) {
            state.hasPermission = has;
        },
        [types.SET_MENU_PERMISSION](state, has) {
            state.menuPermission = has;
        },
    },
    actions: {
        async [types.SET_USER_INFO]({ commit }, { payload, permission }) {
            commit(types.SET_USER_INFO, payload);
            commit(types.SET_PERMISSION, permission);
        },
        async [types.USER_LOGIN]({ commit, dispatch }, payload) {
            try {
                let result = await user.login(payload);
                console.log("user_login", result);
                dispatch(types.SET_USER_INFO, { payload: result.data, permission: true });
            } catch (e) {
                return Promise.resolve(e);
            }
        },
        async [types.USER_VALIDATE]({ dispatch }) {
            // 没token就用发请求
            if (!getLocal("token")) {
                return false;
            }
            try {
                let result = await user.validate();
                dispatch(types.SET_USER_INFO, { payload: result.data, permission: true });
                return true;
            } catch (e) {
                dispatch(types.SET_USER_INFO, { payload: {}, permission: false });
                return false;
            }
        },
        async [types.USER_LOGOUT]({ dispatch }) {
            dispatch(types.SET_USER_INFO, { payload: {}, permission: false });
        },
        async [types.ADD_ROUTE]({ commit, state }) {
            // 后端返回的用户的权限
            let authList = state.userInfo.auths;
            console.log(authList, per);
            if (authList) {
                // 通过权限过滤出当前用户的路由
                let routes = filterRouter(authList);
                console.log("filterRouter", routes);
                // 去用户配置的router里面找一级菜单 manager
                let managerRoute = router.options.routes.find((item) => item.path === "/manager");
                console.log("router", router.options.routes);
                // 添加儿子路由
                managerRoute.children = routes;
                router.addRoute(managerRoute);
                console.log("router after", router.options.routes);
                commit(types.SET_MENU_PERMISSION, true);
            }
        },
    },
};
