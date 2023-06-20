import { getSlider } from "@/api/public";
import * as types from "@/store/action-types";
import WS from "@/utils/websocket";

export default {
    state: {
        sliders: [],
        ws: null, // 全局的
        message: "", // 消息
    },
    getters: {},
    mutations: {
        async [types.SET_SLIDERS](state, payload) {
            state.sliders = payload;
        },
        async [types.CREATE_WEBSOCKET](state, payload) {
            state.ws = payload;
        },
        async [types.SET_MESSAGE](state, payload) {
            state.message = payload;
        },
    },
    actions: {
        async [types.SET_SLIDERS]({ commit }) {
            let { data } = await getSlider();
            console.log("slider", data);
            commit(types.SET_SLIDERS, data);
        },
        async [types.CREATE_WEBSOCKET]({ commit }) {
            let ws = new WS();
            ws.create();
            commit(types.CREATE_WEBSOCKET, ws);
        },
    },
};
