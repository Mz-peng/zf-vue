let express = require('express')

let app = express()

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    next();
});

app.get('/getRole', (req, res) => {
    res.json({
        menuList: [
            {pid: -1, path: '/cart', name: '购物车', id: 1, auth: 'cart'},
            {pid: 1, path: '/cart/cart-list', name: '购物车列表', id: 4, auth: 'cart-list'},
            {pid: 4, path: '/cart/cart-list/lottery', name: '彩票', id: 5, auth: 'lottery'},
            {pid: 4, path: '/cart/cart-list/product', name: '商品', id: 6, auth: 'product'},
            {pid: -1, path: '/shop', name: '商店', id: 2, auth: 'shop'},
            {pid: -1, path: '/profile', name: '个人中心', id: 3, auth: 'profile'},
        ]
    })
})

app.listen(3000)
