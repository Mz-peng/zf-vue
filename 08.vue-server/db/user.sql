create table user
(
    u_id        int auto_increment comment '主键'
        primary key,
    username    varchar(255)            not null comment '用户名',
    password    varchar(255)            not null comment '密码',
    name        varchar(255)            null comment '昵称',
    gender      varchar(32) default 'U' null comment '性别',
    avatar      varchar(255)            null comment '头像',
    status      int(1)      default 1   null comment '状态',
    create_time datetime                null comment '注册账号时间',
    update_time datetime                null comment '最后更新时间'
)
    comment '用户';

INSERT INTO zf.user (u_id, username, password, name, gender, avatar, status, create_time, update_time) VALUES (1, 'zhangsan@qq.com', '$2a$10$VRRyJwspO6vlwkZBlT/C0OrbeCUP6wPPyozdFBrf/g8jcFFHCxjXC', null, 'U', null, 1, '2023-05-10 23:37:48', null);
