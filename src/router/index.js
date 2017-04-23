import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/page-components/login'
import home from 'components/page-components/home'
import invest from 'components/page-components/invest'
import user from 'components/page-components/user'
import product from 'components/page-components/product'
import performance from 'components/page-components/performance'
import myPerformance from 'components/page-components/myPerformance'
import lowerPerformance from 'components/page-components/lowerPerformance'
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
      name:'home',
      component:home
    },

    {
      path:'/invest',
      name:'invest',
      component:invest,
      children:[
        {
          path:'/',
          redirect:'/invest/current'
        },
        {
          path:'/invest/regular',
          component:product
        },
        {
          path:'/invest/current',
          component:product
        }
      ]
    },

    {
      path:'/user',
      name:'user',
      component:user
    },
    {
      path:'/user/performance',
      name:'performance',
      component:performance,
      children:[
        {
          path:'/',
          redirect:'/user/myPerformance'
        },
        {
          path:'/user/myPerformance',
          component:myPerformance
        },
        {
          path:'/user/lowerPerformance',
          component:lowerPerformance
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
