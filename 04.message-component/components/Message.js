import Vue from 'vue'
import MessageComponent from './Message.vue'

/**
 * 获取当前组件的实例
 */
let getInstance = () => {
  // 1.构建一个实例
  let vm = new Vue({
    // 2.将组件渲染到实例上
    render: (h) => h(MessageComponent),
  }).$mount() // 会在内存中挂载
  // vm.$el 将真实的实例扔到文档中
  document.body.appendChild(vm.$el)
  // 从实例中获取子组件，只有一个子组件
  let childComponent = vm.$children[0]
  return {
    add(options) {
      // 调用子组件的add()
      childComponent.add(options)
    },
  }
}

/**
 * 单列模式
 * 返回唯一的实例
 */
let instance
let getInst = () => {
  instance = instance || getInstance()
  return instance
}

const Message = {
  info(options) {
    getInst().add(options)
  },
  warn() {},
  success() {},
  error() {},
}

export { Message }

/**
 * 写插件的原理
 */
let _Vue
export default {
  /**
   * 安装插件 Message
   * @param Vue
   * @param options use的第二个参数
   */
  install(Vue, options) {
    console.log(Vue, options)
    // 防止用户多次use
    if (!_Vue) {
      _Vue = Vue
      let $message = {}
      Object.keys(Message).forEach((type) => {
        $message[type] = Message[type]
      })
      Vue.prototype.$message = $message
    }

    /**
     * vue 遍历组件的特点
     */
    Vue.mixin({
      /**
       * 所有组件都增加了这个方法
       */
      beforeCreate() {
        if (this.$options.info) {
          console.log('根')
          console.log(this.$options.info)
          this._info = this.$options.info
        } else {
          console.log('不是根元素')
          this._info = this.$parent && this.$parent._info
        }
      },
    })
  },
}
