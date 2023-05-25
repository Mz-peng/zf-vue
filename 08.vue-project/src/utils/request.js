// 我们要将axios二次封装 http://www.axios-js.com/zh-cn/docs/index.html
import config from "@/config";
import axios from "axios";
import { setLocal, getLocal } from "@/utils/local";

class HttpRequest {
    constructor() {
        // 这里可以增加实例属性 后台接口的路径 开发模式和生产模式不一样
        this.baseURL = config.baseURL;
        // 3s 后超时
        this.timeout = 3000;
    }

    setInterceptors(instance) {
        instance.interceptors.request.use((config) => {
            // 一般增加一些token属性
            config.headers.setAuthorization("Bearer " + getLocal("token"));
            return config;
        });

        instance.interceptors.response.use(
            (res) => {
                if (res.status === 200) {
                    // 统一处理错误状态码
                    if (res.data.code === "00200") {
                        // 服务器返回的结果都会放到data中
                        return Promise.resolve(res.data);
                    } else if (res.data.code === "00500") {
                        // 业务异常，后端返回状态码 00500
                        return Promise.reject(res.data.msg);
                    } else {
                        return Promise.reject(res.data.msg);
                    }
                } else {
                    // 我的后端实现的话，如果失败了会在返回的结果中增加一个data字段(失败原因)
                    return Promise.reject(res.data.data);
                }
            },
            (err) => {
                // 单独处理其他的状态码异常
                switch (err.response.status) {
                    case "401":
                        break;
                    default:
                        break;
                }
                return Promise.reject(err);
            }
        );
    }

    mergeOptions(options) {
        return { baseURL: this.baseURL, timeout: this.timeout, ...options };
    }

    request(options) {
        // 创建 axios 实例
        const instance = axios.create();
        // 每个实例的拦截器和其他人无关，如果使用全局实例，我想给每次请求单独配置独立拦截器做不到
        this.setInterceptors(instance);
        // 配置属性合并(默认 + 用户)
        const opts = this.mergeOptions(options);
        return instance(opts);
    }

    get(url, params) {
        return this.request({
            method: "get",
            url,
            params: params, // 参数可以直接展开
        });
    }

    post(url, data) {
        return this.request({
            method: "post",
            url,
            data: data, // post 必须传入data属性
        });
    }
}

export default new HttpRequest();
