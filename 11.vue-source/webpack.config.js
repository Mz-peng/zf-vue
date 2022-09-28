const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // production 生产; development 开发
    mode:"development",
    // 以我们的src的index.js 作为入口进行打包
    entry: './src/index.js',
    output: {
        // 打包后的文件名
        filename: "bundle.js",
        // 打包后的路径
        path: path.resolve(__dirname, 'dist')
    },
    // 可以产生source-map 源码映射
    devtool: 'source-map',
    // 更改webpack解析第三方模块的查找方式
    resolve: {
        // 先去source文件夹下找，然后再去node_modules下找
        modules: [path.resolve(__dirname, 'source'), path.resolve('node_modules')]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ]
}
