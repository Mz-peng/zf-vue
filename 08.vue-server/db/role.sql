create table role
(
    role_id   int auto_increment
        primary key,
    name      varchar(128) null,
    role_type varchar(32)  not null comment '角色标识'
);

INSERT INTO zf.role (role_id, name, role_type) VALUES (1, '超级管理员', 'admin');
