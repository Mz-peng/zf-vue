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
    },
};
