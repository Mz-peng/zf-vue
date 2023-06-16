create table slider
(
    s_id int auto_increment comment '主键'
        primary key,
    url  varchar(255) null comment '图片地址'
)
    comment '轮播图';

INSERT INTO zf.slider (s_id, url) VALUES (1, 'https://zf-1308611627.cos.ap-guangzhou.myqcloud.com/claire-chang-0H213pbF9zg-unsplash.jpg');
INSERT INTO zf.slider (s_id, url) VALUES (2, 'https://zf-1308611627.cos.ap-guangzhou.myqcloud.com/claire-chang-NN_s1Au-KVY-unsplash.jpg');
INSERT INTO zf.slider (s_id, url) VALUES (3, 'https://zf-1308611627.cos.ap-guangzhou.myqcloud.com/tmp_10eb7a5181ff435d2a66f89c33bc4c987f3f7808707e887e.jpg');
