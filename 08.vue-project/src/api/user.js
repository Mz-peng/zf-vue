import axios from "@/utils/request";
import config from "@/api/config/user";

/**
 * 用户注册
 * @param data
 * @returns {*}
 */
export const reg = (data) => axios.post(config.reg, data);