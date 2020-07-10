为保证上传速度，已删除node安装包，请按照以下步骤自行下载。
## webpack基本使用
小demo隔行变色：
顺序：num install webpack webpack-cli -D  安装webpack
          在根目录下创建 webpack.config.js 的 webpack 配置文件
          在webpack的配置文件中
```js
module.exports={
  mode:'development' //构建模式 还有production 开发用de 可以提高编译速度，打包上线用production，缩小体积
}
```
在package.json配置文件中的scripts节点下，新增dev脚本：、
```js
"scripts":{
	"dev":"webpack" //script 节点下的脚本，可以用npm run执行
}
```
在终端运行npm run dev ，webpack打包
打包输入文件：index.js 出口 main.js
修改打包的入口和出口，在webpack.config.js中新增如下配置信息
```js
const path = require('path')
module.exports = {
    //编译模式
    mode: 'production', //development production
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'), //输出文件存放路径
        filename: 'bundle.js' //输出文件名
    }
}
```
###  webpack自动打包配置
1. npm install webpack-dev-server -D
2. 修改package.json->scripts中的dev：
```js
"dev": "webpack-dev-server"
```
3. 将src中的index.html中，script脚本的引用路径改为‘buldle.js’即你输出文件
4. 运行 npm run dev命令，重新打包
之后只要更改保存就会自动打包。
webpack-dev-server 打包生成的输出文件，默认放到了项目根目录中，而且是虚拟的、看不见的。

### webpack生成预览页面
我们打包后进入的是一个根目录，怎样把它变成直接进入一个网页呢：
1. npm install html-webpack-plugin -D
2. 修改webpack.config.js
```js
//导入生成预览页面插件，得到构造函数
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({ //创建插件的实例对象
    template: './src/index.html',  //指定要用到的模板文件
    filename: 'index.html' //指定要生成的文件名称，存于内存中，目录不显示
})
```
3.修改里面的配置对象，新增：
```js
module.exports = {
    plugins: [htmlPlugin]   
}
```
打包完的一瞬间自动弹开页面：
修改package.json->scripts中的dev：
```js
"dev": "webpack-dev-server --open --host 127.0.0.1 --port 8888"
```
open是自动打开，host是配置ip地址，port是配置端口号
## 加载器
### webpack通过loader打包非js模块
开发中，webpack默认只能打包处理以.js后缀名结尾的模块，其他非。js后缀名结尾的模块，它处理不了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200710133045242.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200710133138975.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0pvYW5uZV9qb2lu,size_16,color_FFFFFF,t_70)
+ 打包处理css：
npm install style-loader css-loader -D
在webpack.config.json中配置：
```js
module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
    }
```
loader顺序是固定的，多个loader从后往前调用，即先css再style。
在index.js引入
import './css/1.css'
+ 处理less
npm install less-loader less -D
配置：
```js
module.exports = {
    module: {
        rules: [{
            test: /\.less$/,
            use: ['style-loader', 'css-loader','less-loader']
        }]
    }
    }
```
在配置完成后一定要在index.js引入
import './css/1.less'
+ 处理scss文件
   运行npm install sass-loader node-sass -D命令
   配置webpack如上less
+ 配置postCSS自动添加css兼容前缀
npm install postcss-loader autoprefixer -D
在项目根目录创建并配置postcss.config.js文件：
```js
    const autoprefixer = require("autoprefixer"); //导入插件
    module.exports = {
        plugins:[ autoprefixer ]//挂载插件
    }
```
更改webpack.config.js的module中的rules数组
```js
      module.exports = {

        module : {
            rules:[
                {
                    //test设置需要匹配的文件类型，支持正则
                    test:/\.css$/,
                    //use表示该文件类型需要调用的loader
                    use:['style-loader','css-loader','postcss-loader']//加在这里
                },
              .....
            ]
        }
    }
```
+ 打包样式表中的图片和字体文件：
加载图片时会报错，所有文件都加载不了了
npm install url-loader file-loader -D
配置webpack文件
```js
module: {
        rules: [{
            test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
            use: ['url-loader?limit=16940'] //图片大小，byte单位，会转成base64图片,base64图片速度更快
        }]
    }
```
+ 处理js高级语法：
npm install babel-loader @babel/core @babel/runtime -D 
npm install @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D
创建babel.config.js
```js
module.exports = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
}
```
在webpack中配置：
```js
module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }] //匹配所有js文件 除了node_modules中的
    }
```
