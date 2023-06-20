package com.mzp.vueserver.enums;

import com.baomidou.mybatisplus.annotation.IEnum;
import lombok.Getter;

@Getter
public enum GenderEnum implements IEnum<String> {

    MAN("M", "男"),
    FEMALE("F", "女"),
    UNKNOWN("U", "未知");

    GenderEnum(String code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    private String code;

    private String desc;

    @Override
    public String getValue() {
        return this.code;
    }
}
