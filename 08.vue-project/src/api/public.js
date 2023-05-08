import config from "@/api/config/public";
import axios from "@/utils/request";
import { getLocal } from "@/utils/local"

/**
 * 获取轮播图
 * @returns {*}
 */
export const getSlider = () => axios.get(config.getSlider);

/**
 * 获取验证码
 * 创建一个唯一的用户标识 和 验证码对应
 * @returns {*}
 */
export const getCaptcha = () => axios.get(config.getCaptcha, {
    uid: getLocal("uuid")
});

/**
 * 接口调用
 * 1.在页面中调用
 * 2.vuex中获取数据 action
 *  数据是全局的放在vuex中去
 *  可以复用的
 *  做缓存
 */

