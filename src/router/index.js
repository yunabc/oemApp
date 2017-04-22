import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/page-components/login'
import Hello from 'components/Hello'
import Home from 'components/page-components/home'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',

      name: 'login',
      component: login

      name: 'Hello',
      component: Hello
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    }
  ]
})
