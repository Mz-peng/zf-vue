/**
 * 使用proxy来实现数据的响应式变化
 * 可以支持数组，而且不用区分是对象还是数组
 * 兼容性 vue3.0 会采用如果支持proxy 就使用proxy，不支持还是Object.defineProperty
 */

let obj = {
  name: "jw",
  school: { class: 9 },
};

let handler = {
  get(target, key) {
    // 如果取的值是对象，就对这个对象进行数据劫持
    if (typeof target[key] == "object" && typeof target[key] !== null) {
      return new Proxy(target[key], handler);
    }
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    if (key === "length") {
      return true;
    }
    render();
    return Reflect.set(target, key, value);
  },
};

function render() {
  console.log("模拟试图更新");
}

let proxy = new Proxy(obj, handler);
proxy.school.class = 10;
console.log(obj);
