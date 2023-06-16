package com.mzp.vueserver;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan(value = "com.mzp.vueserver.mapper")
@SpringBootApplication
public class VueServerApplication {

    public static void main(String[] args) {


        SpringApplication.run(VueServerApplication.class, args);
    }

}
