# vuedemo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 初始化 webpack 项目
vue init webpack my-project
cd my-project

#属性字符拼接
<swiper-slide v-for='item in list'><img :src="'http://localhost:3000/' + item.url" ></swiper-slide>

#评论弹出框，使用自定directive(指令)在update（）时 获取焦点
  指令 官方提供的五个钩子
    bind 只调用一次，指令第一次绑定到 元素时调用 ，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作
    inserted 被绑定元素所在的模板更新时调用，而不论绑定值是否变化，通过比较更新前后的绑定值，可以忽略不必要的模板更新
    componentUPdated 被绑定元素所在模板完成 一次更新周期时调用
    unbind 只调用一次，指令与元素解绑时调用


