import Vue from 'vue' // 默认先查找source目录下的vue文件夹


/**
 * es6 类 构造函数 es5的类
 */
let vm = new Vue({
    // 表示要渲染的元素是app
    el: '#app',
    data() {
        // Object.defineProperty
        return {
            msg: 'hello',
            school: {name: 'zf', age: 10},
            arr: [1, 2, 3]
        }
    },
    computed: {

    },
    watch: {

    }
})

console.log(vm)
console.log('test initData', vm.msg)
console.log('test initData', vm.msg = 100)
