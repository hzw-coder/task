import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('../pages/Login/Login.vue')
const Home = () => import('../pages/Home/Home.vue')

Vue.use(Router)

const router = new Router({
  routes: [{ //路由重定向
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
// 路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path == '/login') {
//     return next()
//   }
//   const token = window.localStorage.getItem('token')
//   console.log(token);
//   if (!token) {
//     return next('/login')
//   } else {
//     next()
//   }
// })


export default router
