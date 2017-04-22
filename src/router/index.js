import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/page-components/login'
import Hello from 'components/Hello'
import Home from 'components/page-components/home'
import lostpassword from 'components/page-components/lostpassword'
import register from 'components/page-components/register'
import registernext from 'components/page-components/registernext'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      children:[
        {
          path:'/lostpassword',
          name:'lostpassword',
          component:lostpassword
        },
        {
          path:'/register',
          name:'register',
          component:register,
          children:[{
            path:'/next',
            name:'registernext',
            component:registernext
          }]
        }
      ]
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    }
  ]
})
