import Observer from "./Observer";

/**
 * 初始化状态
 * data computed watch
 */
export function initState(vm) {
    console.log('initState', vm)
    // 做不同的初始化工作
    let opts = vm.$options
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed()
    }
    if (opts.watch) {
        initWatch()
    }

}

/**
 * 初始化数据
 * 将用户传入的数据，通过Object.defineProperty重新定义
 */
function initData(vm) {
    // 用户传入的data
    let data = vm.$options.data
    // 判断 data 是函数还是属性，如果是，则取data的返回值，否则就取data
    // _data 表示重新声明的一个数据
    data = vm._data = typeof data === "function" ? data.call(vm) : data || {}

    for (const key in data) {
        proxy(vm, '_data', key)
    }

    observe(vm._data)
}

/**
 * 代理数据 vm.msg = vm._data.msg
 * 会将对vm上的取值操作和赋值操作代理给vm._data 属性
 * @param vm
 * @param source
 * @param key
 */
function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(v) {
            vm[source][key] = v
        }
    })
}

/**
 * 观察数据
 * @param data
 */
export function observe(data) {
    if (typeof data !== 'object' || data === null) {
        // 不是对象或者是null，就不需要执行后面的逻辑
        return
    }

    return new Observer(data);
}

/**
 * 初始化计算属性
 */
function initComputed() {

}

/**
 * 初始化watch
 */
function initWatch() {

}
