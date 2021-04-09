//1 导入需要的包 文件包无法导入,只能直接引入
// import axios from './packages/axios.js'
// import Vue  from './packages/vue.js'   
// import VueRouter  from './packages/vue-router.js'   
// Vue.use(VueRouter)

//2 导入app组件，各组件结合体
import app from './views/app.js'

//3 导入自定义路由模块-todo
// import router from './router.js'

//新建实例，作为事件中心，
const eventHub = new Vue()
//也可以添加到vue原型中，可以任意组件中使用this.eventHub调用
Vue.prototype.eventHub = new Vue({})

// 本地file运行读取有跨域问题，使用node启用服务器
axios.get('./public/myConfig.json').then((response) => {
  let str  =response.data
  let obj = eval(" ( " + str +" ) ")
  console.log(obj)
  // 初始配置文件
  window.myConfig =obj

  // axios进行初始化
  // axiosUtils.axiosInit()

  new Vue( {
    data:{},
    // router, //挂载路由组件
    // store,  // 挂载仓库store
    // components:{ app  }, //传统注册组件,还需要在index.html中引用<app></app>
    render:c => c(app) , //渲染替换 #app
  }).$mount('#app');



})

