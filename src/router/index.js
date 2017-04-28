import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/page-components/login'
import home from 'components/page-components/home'
import invest from 'components/page-components/invest'
import user from 'components/page-components/user'
import regularProduct from 'components/page-components/regularProduct'
import currentProduct from 'components/page-components/currentProduct'
import performance from 'components/page-components/performance'
import myPerformance from 'components/page-components/myPerformance'
import lowerPerformance from 'components/page-components/lowerPerformance'
import lostpassword from 'components/page-components/lostpassword'
import register from 'components/page-components/register'
import registernext from 'components/page-components/registernext'
import account from 'components/page-components/account'
import changePassword from 'components/page-components/changePassword'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,

    },
    {
      path:'/lostpassword',
      name:'lostpassword',
      component:lostpassword
    },
    {
      path:'/register',
      name:'register',
      component:register

    },{
      path:'/next',
      name:'registernext',
      component:registernext
    },
    {
      path:'/home',
      name:'home',
      component:home
    },
    {
      path:'/',
      redirect:'home'
    },
    {
      path:'/invest',
      component:invest,
      children:[
        {
          path:'/',
          redirect:'/invest/current'
        },
        {
          path:'/invest/regular',
          component:regularProduct
        },
        {
          path:'/invest/current',
          component:currentProduct
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
    },{
      path: '/account',
      name: 'account',
      component: account
    },{
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword
    }
  ],
  linkActiveClass: 'active'
})
