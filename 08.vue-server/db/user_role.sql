create table user_role
(
    user_role_id int auto_increment
        primary key,
    user_id      int null,
    role_id      int null
);

INSERT INTO zf.user_role (user_role_id, user_id, role_id) VALUES (1, 1, 1);
