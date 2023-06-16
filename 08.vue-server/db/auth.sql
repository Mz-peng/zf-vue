create table auth
(
    auth_id int auto_increment comment '主键'
        primary key,
    name    varchar(128) null comment '菜单名称',
    pid     int          null comment '父ID',
    auth    varchar(128) null comment '标识',
    path    varchar(256) null
);

INSERT INTO zf.auth (auth_id, name, pid, auth, path) VALUES (1, '用户管理', -1, '', null);
INSERT INTO zf.auth (auth_id, name, pid, auth, path) VALUES (2, '用户权限', 1, 'userAuth', '/manager/userAuth');
INSERT INTO zf.auth (auth_id, name, pid, auth, path) VALUES (3, '用户统计', 1, 'userStatistics', '/manager/userStatistics');
INSERT INTO zf.auth (auth_id, name, pid, auth, path) VALUES (4, '信息发布', -1, 'infoPublish', '/manager/infoPublish');
INSERT INTO zf.auth (auth_id, name, pid, auth, path) VALUES (5, '文章管理', -1, 'articleManager', '/manager/articleManager');
