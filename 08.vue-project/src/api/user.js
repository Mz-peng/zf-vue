import axios from "@/utils/request";
import config from "@/api/config/user";

/**
 * 用户注册
 * @param data
 * @returns {*}
 */
export const reg = (data) => axios.post(config.reg, data);

/**
 * 登录
 *权限 + 用户信息 全局数据放vuex中，只要数据变化，试图就会更新
 * @param data
 * @returns {*}
 */
export const login = (data) => axios.post(config.login, data);
