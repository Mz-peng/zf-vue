// set 集合 不能放重复的值
let s01 = [1, 2, 3, 4, 6]
let s02 = [3, 4, 5, 1, 2]

// 集合 并集 交集 差集
/**
 * 并集
 * @param arr1
 * @param arr2
 * @returns {any[]}
 */
function union(arr1, arr2) {
    let s1 = new Set(arr1)
    let s2 = new Set(arr2)
    return [...new Set([...s1, ...s2])]
}

console.log(union(s01, s02))

/**
 * 交集
 * @param arr1
 * @param arr2
 * @returns {any[]}
 */
function intersection(arr1, arr2) {
    return [...new Set(arr1)].filter(item => {
        return  new Set(arr2).has(item)
    })
}

console.log(intersection(s01, s02))

/**
 * 差集
 * @param arr1
 * @param arr2
 * @returns {any[]}
 */
function diff(arr1, arr2) {
    return [...new Set(arr1)].filter(item => {
        return  !new Set(arr2).has(item)
    })
}

console.log(diff(s01, s02))


// map 有key 不能放重复的值
let m = new WeakMap() // WeakMap 的key必须是对象类型
let objKey = {name: 'ww'}
m.set(objKey, '18')
objKey = null
console.log(objKey)
console.log(m)
// v8引擎的垃圾回收
