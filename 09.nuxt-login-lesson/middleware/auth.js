// 校验用户权限

export default ({ store, redirect }) => {
  // 客户端服务端都会执行
  if (!store.state.username) {
    // 没有登录过，跳转首页
    redirect('/')
  }
}
