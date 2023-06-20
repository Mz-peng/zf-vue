package com.mzp.vueserver.enums;

import com.baomidou.mybatisplus.annotation.IEnum;
import lombok.Getter;

@Getter
public enum StatusEnum implements IEnum<Integer> {

    ENABLE(1, "启用"),
    DISABLED(0, "禁用");

    StatusEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    private Integer code;

    private String desc;

    @Override
    public Integer getValue() {
        return this.code;
    }
}
