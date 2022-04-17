//1 导入需要的包 文件包无法导入,只能直接引入
// import axios from './packages/axios.js'
// import Vue  from './packages/vue.js'
// import VueRouter  from './packages/vue-router.js'
// Vue.use(VueRouter)
import config from './config/index.js'

//2 导入app组件，各组件结合体
import app from './views/app.js'

//3 导入自定义路由模块-todo
// import router from './router.js'

// 初始配置
console.log('->', config, '<')
window.myConfig = config

// axios进行初始化
// axiosUtils.axiosInit()

//新建实例，挂载到全局，作为事件中心，
window.EVENT_BUS = new Vue()
//也可以添加到vue原型中，只能通过vm实例中使用this.eventHub调用，js中使用不方便
// Vue.prototype.eventHub = new Vue({})

new Vue({
    data: {},
    // router, //挂载路由组件
    // store,  // 挂载仓库store
    // components:{ app  }, //传统注册组件,还需要在index.html中引用<app></app>
    render: (c) => c(app) //渲染替换 #app
}).$mount('#app')


//本地file运行读取有跨域问题，使用node启用简易服务器

