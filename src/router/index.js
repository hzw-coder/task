import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('../pages/Login/Login.vue')
const Home = () => import('../pages/Home/Home.vue')
const Welcome = () => import('../pages/Welcome/Welcome.vue')

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
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
      component: Home,
      redirect: '/welcome',
      children: [{
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      }]
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
