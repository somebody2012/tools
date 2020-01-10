#### 使用方法
##### 分为两部分：
##### 1、开发模式
src/main/config.js 中**isDev**配置为true
先在目录src/vue-render 终端输入命令 npm start
再在根目录 终端输入命令 start
即可调试代码 shift+d 打开控制台
##### 2、打包发布
src/main/config.js 中**isDev**配置为false
根目录下运行命令 sh ./build/build.sh
即可打包应用到dist目录

#### 工具包括
* 交易生成工具
* 接口生成工具
* F表生成工具
