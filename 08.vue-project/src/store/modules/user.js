import * as user from "@/api/user";
import * as types from "@/store/action-types";
import { getLocal, setLocal } from "@/utils/local";

export default {
    state: {
        userInfo: {}, //用户信息
        hasPermission: false, //用户权限
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
    },
    actions: {
        async [types.USER_LOGIN]({ commit }, payload) {
            try {
                let result = await user.login(payload);
                console.log("user_login", result);
                commit(types.SET_USER_INFO, result.data);
                commit(types.SET_PERMISSION, true);
            } catch (e) {
                return Promise.resolve(e);
            }
        },
        async [types.USER_VALIDATE]({ commit }) {
            // 没token就用发请求
            if (!getLocal("token")) {
                return false;
            }
            try {
                let result = await user.validate();
                commit(types.SET_USER_INFO, result.data);
                commit(types.SET_PERMISSION, true);
                return true;
            } catch (e) {
                commit(types.SET_USER_INFO, {});
                commit(types.SET_PERMISSION, false);
                return false;
            }
        },
    },
};
