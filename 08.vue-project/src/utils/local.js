/**
 * 设置的时候根据需要将 对象转化为字符串
 * @param key
 * @param value
 */
export const setLocal = (key, value) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

/**
 * 获取本地的值 需要转化成对象
 * @param key
 */
export const getLocal = (key) => {
  if (key.includes("[") || key.includes("{")) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return localStorage.getItem(key);
  }
};
