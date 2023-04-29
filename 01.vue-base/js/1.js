// Vue的特点 如果是对象会使用Object.defineProperty
// 会把数组的方法重写
function render() {
  console.log("模拟试图渲染");
}

let obj = {
  name: "jw",
  location: {
    x: 100,
    y: 100,
  },
};

let arr = [1, 2, 3];

let methods = ["pop", "shift", "unshift", "sort", "reverse", "splic", "push"];
// 先获取到原来的原型上的方法
let arrayProto = Array.prototype;
// 创建一个自己的原型，并且重写methods这些方法
let proto = Object.create(arrayProto);

methods.forEach((method) => {
  proto[method] = function () {
    arrayProto[method].call(this, ...arguments);
    render();
  };
});

// 把所有的属性定义成set/get的方式
function observer(obj) {
  if (Array.isArray(obj)) {
    obj.__prota__ = proto;
    return;
  }
  if (typeof obj == "object") {
    for (const key in obj) {
      defineReactive(obj, key, obj[key]);
    }
  }
}

function defineReactive(data, key, value) {
  observer(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      observer(newValue);
      if (newValue != value) {
        render();
        value = newValue;
      }
    },
  });
}

observer(obj);
obj.name = "zf";
obj.location.x = 200;

// vue 如果给对象新增属性，是不会被监控的 $set
// 如果想给对象新增一个不存在的属性 obj.location = {...obj.location.gender: "女"}
function $set(data, key, value) {
  if (Array.isArray(data)) {
    // 当前用户调用了splice方法
    return data.splice(key, 1, value);
  }
  defineReactive(data, key, value);
}

$set(obj, "gender", "男");
obj.gender = "女";

console.log(obj.gender);

arr.push(222);
console.log(arr);

$set(arr, 0, 100);
console.log(arr);
