package com.mzp.vueserver.domain;

public enum ResultStatusEnum implements BaseResultInfoInterface {
    // 数据操作定义
    SUCCESS("00200", "操作成功!"),

    BODY_NOT_MATCH("00400","请求的数据格式不符!"),
    UNAUTHORIZED("00401","无权限访问!"),
    NOT_FOUND("00404", "未找到该资源!"),
    INTERNAL_SERVER_ERROR("00500", "操作失败!"),

    SERVER_BUSY("00503","服务器正忙，请稍后再试!");

    /**
     * 错误码
     */
    private final String errorCode;

    /**
     * 错误描述
     */
    private final String errorMsg;

    ResultStatusEnum(String errorCode, String errorMsg) {
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }

    @Override
    public String getResultCode() {
        return errorCode;
    }

    @Override
    public String getResultMsg() {
        return errorMsg;
    }
}
