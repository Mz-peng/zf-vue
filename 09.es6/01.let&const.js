// var 要求全部该用 let const

// 1) var 声明的变量 (污染全局变量)
// var a = 1;
// console.log(window.a)

// 2) 不要使用var 导致变量等级升级
// console.log(a)
// var a = 1;

// 3) var 可以被重复声明; let 可以解决重复定义的问题
// var a = 1;
// var a = 2;
// var a = 3;

// 4) var 作用域的问题 (常见的作用域 全局作用域 函数作用域)
// {
//     var a = 1;
// }
// console.log(a)

let a = 100
{
    console.log(a) // 暂存死区
    let a = 200
}

for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i)
    })
}

// const 常量 不会变的量 (地址不变既可)
const PI = { r: '3.14' }
PI.r = 3.15
