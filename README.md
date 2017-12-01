# donut-manage

> 多纳后台管理

## 项目说明

该项目作为vue开发规范样板参考

项目目前用到的技术、框架： Vue2 + Vuex + vue-router + iview2 + Axios + Sass （适用于pc开发）

项目搭建应由项目主要负责人或者对项目逻辑了解最多的人去搭建配置项目（/config 、 /router/index.js、 /store/index.js、 main.js等关键文件），多人合作开发项目时，关键文件需由主要负责人去提交Git以防止文件冲突。

## 项目重点目录介绍 

    config  --- 配置文件：配置开发环境代理Api等，自动根据环境打包

    dist    --- 打包文件目录：打包后将次文件夹下的所有目录上传到测试或正式服务器

    node_modules    --- 模块依赖：开发时请勿提交git，忽略此文件夹

    src

        Api --- 数据层：接口统一封装到此文件夹下，按模块负责各自的接口。

        assets  --- 静态资源文件：包括公用css、特殊css、images、js、JQuery插件文件等

        components  --- 项目组件：各自按模块进行开发

        router  --- 路由目录，存放页面跳转路由文件（需要新增路由时，需要通知项目负责人）

        store   --- store仓库：按模块管理各自的vue数据状态

                    业务层：暂时将业务层放在store里，按模块进行具体业务逻辑的实现。

        utils   --- 工具层：专门封装可复用的函数或方法


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
