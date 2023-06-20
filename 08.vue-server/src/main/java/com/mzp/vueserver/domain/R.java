package com.mzp.vueserver.domain;


import com.mzp.vueserver.constant.HttpStatus;

import java.io.Serializable;

/**
 * 响应信息主体
 *
 * @author tienchin
 */
public class R<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    private String code;

    private String msg;

    private T data;

    public R() {
    }

    public R(BaseResultInfoInterface errorInfo) {
        this.code = errorInfo.getResultCode();
        this.msg = errorInfo.getResultMsg();
    }

    public R(BaseResultInfoInterface errorInfo, T data) {
        this.code = errorInfo.getResultCode();
        this.msg = errorInfo.getResultMsg();
        this.data = data;
    }

    public static <T> R<T> ok() {
        return restResult(null, ResultStatusEnum.SUCCESS.getResultCode(), ResultStatusEnum.SUCCESS.getResultMsg());
    }

    public static <T> R<T> ok(String msg) {
        return restResult(null, ResultStatusEnum.SUCCESS.getResultCode(), msg);
    }

    public static <T> R<T> ok(T data) {
        return restResult(data, ResultStatusEnum.SUCCESS.getResultCode(), ResultStatusEnum.SUCCESS.getResultMsg());
    }

    public static <T> R<T> ok(BaseResultInfoInterface resultInfoInterface) {
        return restResult(null, resultInfoInterface.getResultCode(), resultInfoInterface.getResultMsg());
    }

    public static <T> R<T> ok(BaseResultInfoInterface resultInfoInterface, T data) {
        return restResult(data, resultInfoInterface.getResultCode(), resultInfoInterface.getResultMsg());
    }

    public static <T> R<T> ok(T data, String msg) {
        return restResult(data, ResultStatusEnum.SUCCESS.getResultCode(), msg);
    }

    public static <T> R<T> fail() {
        return restResult(null, ResultStatusEnum.SUCCESS.getResultCode(), "操作失败");
    }

    public static <T> R<T> fail(String msg) {
        return restResult(null, ResultStatusEnum.INTERNAL_SERVER_ERROR.getResultCode(), msg);
    }

    public static <T> R<T> fail(T data) {
        return restResult(data, ResultStatusEnum.INTERNAL_SERVER_ERROR.getResultCode(), ResultStatusEnum.INTERNAL_SERVER_ERROR.getResultMsg());
    }

    public static <T> R<T> fail(T data, String msg) {
        return restResult(data, ResultStatusEnum.INTERNAL_SERVER_ERROR.getResultCode(), msg);
    }

    public static <T> R<T> fail(String code, String msg) {
        return restResult(null, code, msg);
    }

    public static <T> R<T> fail(BaseResultInfoInterface errorInfo) {
        return restResult(null, errorInfo.getResultCode(), errorInfo.getResultMsg());
    }

    private static <T> R<T> restResult(T data, String code, String msg) {
        R<T> apiResult = new R<>();
        apiResult.setCode(code);
        apiResult.setData(data);
        apiResult.setMsg(msg);
        return apiResult;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public static <T> Boolean isError(R<T> ret) {
        return !isSuccess(ret);
    }

    public static <T> Boolean isSuccess(R<T> ret) {
        return ResultStatusEnum.SUCCESS.getResultCode().equals(ret.getCode());
    }
}
