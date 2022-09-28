import {observe} from "./index";

class Observer {
    /**
     * 构造函数
     * @param data 就是我们刚才定义的vm._data
     */
    constructor(data) {
        console.log('Observer.constructor', data)
        // 将用户的数据使用 defineProperty 重新定义
        this.walk(data)
    }

    walk(data) {
        // 获取对象所有的key
        let keys = Object.keys(data)
        console.log("walk keys", keys)
        for (let i = 0; i < keys.length; i++) {
            // 用户传入的key
            let key = keys[i]
            // 用户传入的值
            let value = data[keys[i]]
            defineReactive(data, key, value)
        }
    }
}

/**
 * 重新定义响应式的数据变化
 */
export function defineReactive(data, key, value) {
    // vue不支持 ie8 及 ie8以下的浏览器

    // 如果value依旧是一个对象的话，需要深度观察
    // 递归观察
    observe(value)

    Object.defineProperty(data, key, {
        get() {
            console.log('data get', value)
            return value
        },
        set(v) {
            if (v === value) {
                return
            }
            console.log('data set', v)
            value = v
        }
    })
}

export default Observer
