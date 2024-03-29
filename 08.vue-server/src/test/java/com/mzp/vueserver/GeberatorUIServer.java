package com.mzp.vueserver;

import com.github.davidfantasy.mybatisplus.generatorui.GeneratorConfig;
import com.github.davidfantasy.mybatisplus.generatorui.MybatisPlusToolsApplication;
import com.github.davidfantasy.mybatisplus.generatorui.mbp.NameConverter;

public class GeberatorUIServer {

    public static void main(String[] args) {
        GeneratorConfig config = GeneratorConfig.builder().jdbcUrl("jdbc:mysql://192.168.56.150:3306/zf?useSSL=false&useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC")
                .userName("root")
                .password("root")
                .driverClassName("com.mysql.jdbc.Driver")
                //数据库schema，MSSQL,PGSQL,ORACLE,DB2类型的数据库需要指定
                //.schemaName("myBusiness")
                //如果需要修改entity及其属性的命名规则，以及自定义各类生成文件的命名规则，可自定义一个NameConverter实例，覆盖相应的名称转换方法，详细可查看该接口的说明：
                .nameConverter(new NameConverter() {
                    /**
                     * 自定义Service类文件的名称规则
                     */
                    @Override
                    public String serviceNameConvert(String tableName) {
                        return this.entityNameConvert(tableName) + "Service";
                    }

                    /**
                     * 自定义Controller类文件的名称规则
                     */
                    @Override
                    public String controllerNameConvert(String tableName) {
                        return this.entityNameConvert(tableName) + "Controller";
                    }
                })
                //所有生成的java文件的父包名，后续也可单独在界面上设置
                .basePackage("com.mzp.vueserver")
                .port(8068)
                .build();
        MybatisPlusToolsApplication.run(config);
    }

}
