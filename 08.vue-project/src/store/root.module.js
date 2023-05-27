import { getSlider } from "@/api/public";
import * as types from "@/store/action-types";

export default {
    state: {
        sliders: [],
    },
    getters: {},
    mutations: {
        async [types.SET_SLIDERS](state, payload) {
            state.sliders = payload;
        },
    },
    actions: {
        async [types.SET_SLIDERS]({ commit }) {
            let { data } = await getSlider();
            console.log("slider", data);
            commit(types.SET_SLIDERS, data);
        },
    },
};
