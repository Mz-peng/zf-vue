// Object.defineProperty es5 vue

// 通过 Object.defineProperty 定义属性，可以增加拦截器
// let user = {}
// Object.defineProperty(user, 'name', {
//     enumerable: true,
//     configurable: true, // 能不能删除这个属性
//     writable: true, // 是否可以重写
//     value: 'hello',
//     get() {
//     },
//     set(v) {
//     }
// })
// console.log(user)


// Vue 的数据劫持 (把所有的属性都改成 get 和 set 方法)
let data = {
    name: 'zfpx',
    age: 18,
    address: {
        location: '宝安',
    },
    score: []
}

/**
 * 模拟的更新方法
 */
function update() {
    console.log('试图更新')
}

/**
 * Object.defineProperty 只能用在对象上 (数组也不识别)
 * @param obj
 */
function observer(obj) {
    if (typeof obj !== 'object') return obj;
    for (let objKey in obj) {
        defineReactive(obj, objKey, obj[objKey])
    }
}

function defineReactive(obj, key, value) {
    Object.defineProperty(obj, key, {
        get() {
            return value
        },
        set(v) {
            if (value !== v) {
                observer(v)
                value = v
                update()
            }
        }
    })
}

observer(data)
data.address = {
    location: '北京'
}
data.address.location = '深圳'
