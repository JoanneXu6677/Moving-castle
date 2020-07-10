const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html'
})
module.exports = {
    //编译模式
    mode: 'development', //development production
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'), //输出文件存放路径
        filename: 'bundle.js' //输出文件名
    },
    plugins: [htmlPlugin],
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                use: ['url-loader?limit=20337'] //图片大小，byte单位，会转成base64图片
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }] //匹配所有js文件 除了node_modules中的
    }
}