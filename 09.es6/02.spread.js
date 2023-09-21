// ... 展开运算符

// 将两个数组合并成一个数组
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let arr3 = [...arr1, ...arr2]
console.log(arr3)

// 深拷贝 (拷贝后无关)  浅拷贝 (拷贝后还有关)
// 将两个对象合并成一个对象
let student = {name : 'li'}
let my = {age: {count: 18}, name: 'zs'}
// 把原来的my放到新对象里，用一个新的age 把原来的age也拷贝一份
let newMy = {...my, age : {...my.age}}
let all = {...student, ...newMy}
my.age.count = 10
console.log(all)

/**
 * 自己实现深拷贝的方法 (递归拷贝 要一层一层的拷贝)
 * 掌握类型判断 typeof instanceof Object.prototype.toString.call constructor
 * @param obj 对象
 * @param hash WeakMap 的key必须是对象类型，防止对象重复拷贝，进入死循环
 */
function deepClone(obj, hash = new WeakMap()) {
    if (obj == null) return obj;
    // 不是对象就不用拷贝
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (typeof obj !== 'object') return obj
    // 如果WeakMap中有这个对象，从WeakMap中取出对象直接返回
    if (hash.has(obj)) return hash.get(obj);

    // 要么是数组，要么是对象
    let cloneObj = new obj.constructor
    // 如果是对象把他放在WeakMap中，如果在拷贝这个对象时，WeakMap中已经有这个对象了，直接返回这个对象
    hash.set(obj, cloneObj)
    // 实现深拷贝
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 如果赋予的值是对象 我们把这个对象防止WeakMap中
            cloneObj[key] = deepClone(obj[key], hash)
        }
    }
    return cloneObj
}
let user = {name: 'zs'}
console.log(deepClone(user))

let ageArr = [18, 20]
console.log(deepClone(ageArr))

let school = {student: {name: 'zs'}}
school.sc = school
console.log(school)
let cloneSchool = deepClone(school)
school.student.name = 'ls'
console.log(cloneSchool)
