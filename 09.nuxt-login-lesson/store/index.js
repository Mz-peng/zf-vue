/**
 * 1. 设置vuex中的状态
 */

export const state = () => ({
  username: '',
})

export const actions = {
  // 服务端默认会调用此方法
  nuxtServerInit({ commit }, { req }) {
    // eslint-disable-next-line no-console
    console.log(req.session)
    // 从session中获取用户信息，判断用户是否登录
    if (req.session.user) {
      commit('set_user', req.session.user.username)
    }
  },
}
export const mutations = {
  set_user(state, username) {
    state.username = username
  },
}
export const getters = {}
