create table role_auth
(
    role_auth_id int auto_increment
        primary key,
    role_id      int not null,
    auth_id      int not null
);

INSERT INTO zf.role_auth (role_auth_id, role_id, auth_id) VALUES (1, 1, 1);
INSERT INTO zf.role_auth (role_auth_id, role_id, auth_id) VALUES (2, 1, 2);
INSERT INTO zf.role_auth (role_auth_id, role_id, auth_id) VALUES (3, 1, 3);
INSERT INTO zf.role_auth (role_auth_id, role_id, auth_id) VALUES (4, 1, 4);
INSERT INTO zf.role_auth (role_auth_id, role_id, auth_id) VALUES (5, 1, 5);
