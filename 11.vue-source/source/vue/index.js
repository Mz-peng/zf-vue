import {initState} from "./observe";

/**
 * vue中原始用户传入的数据
 * @param options
 * @constructor
 */
function Vue(options) {
    console.log(options)
    // 初始化vue，并且将用户选项传入
    this._init(options)
}

/**
 * vue中的初始化
 * @param options
 * @private
 */
Vue.prototype._init = function (options) {
    // this.$options 表示的是vue中参数
    let vm = this
    vm.$options = options

    // MVVM 原理；需要将数据重新初始化
    initState(vm)
}


export default Vue
