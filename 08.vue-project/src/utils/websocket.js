import { getLocal } from "@/utils/local";
import store from "@/store";
import * as types from "@/store/action-types";

/**
 * websocket 可以实现双向通信，长连接，h5提供，可以实时通信
 */
class WS {
    constructor(config = {}) {
        this.url = config.url || "localhost";
        this.port = config.port || 3000;
        this.protocol = config.protocol || "ws";
        // 心跳检测
        this.time = config.time || 30 * 1000;
        this.ws = null;
    }

    /**
     * 连接成功触发
     */
    onopen = () => {
        // 规定好发的数据，必须是对象，对象里包含两个字段 type data
        // websocket 是基于tcp的，第一次连接靠的http，但是不能修改header
        this.ws.send(
            JSON.stringify({
                type: "auth",
                data: getLocal("token"),
            })
        );
    };
    /**
     * 有消息来触发
     * @param e 事件源
     */
    onmessage = (e) => {
        console.log("onmessage", e.data);
        let { type, data } = JSON.parse(e.data);
        switch (type) {
            case "noAuth":
                console.log("没有权限!");
                break;
            case "heartCheck":
                // 心跳检测
                this.checkServer();
                this.ws.send(JSON.stringify({ type: "heartCheck" }));
                break;
            default:
                console.log("message", type, data);
                // 将收到的消息封装在vuex中，方便取出
                store.commit(types.SET_MESSAGE, data);
        }
    };

    /**
     * 检测服务端有没有连接，如果没有则关闭
     */
    checkServer() {
        clearTimeout(this.time); // 防抖
        setTimeout(() => {
            this.onclose();
            this.onerror();
        }, this.time + 10 * 1000); // 断线重连
    }
    /**
     * 连接断开
     */
    onclose = () => {
        this.ws.close();
    };
    /**
     * 连接失败
     */
    onerror = () => {
        setTimeout(() => {
            this.create();
        }, 1000);
    };
    /**
     * 发送消息
     * @param msg
     */
    sendMsg = (msg) => {
        this.ws.send(JSON.stringify({ type: "message", data: msg }));
    };

    create() {
        this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`);
        this.ws.onopen = this.onopen;
        this.ws.onmessage = this.onmessage;
        this.ws.onclose = this.onclose;
        this.ws.onerror = this.onerror;
    }
}

export default WS;
