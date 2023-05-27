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
    },
};
