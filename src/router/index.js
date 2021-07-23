import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('../pages/Login/Login.vue')
const Home = () => import('../pages/Home/Home.vue')
const Welcome = () => import('../pages/Welcome/Welcome.vue')
const Addtask = () => import('../pages/Addtask/Addtask.vue')
const Comment = () => import('../pages/Comment/Comment.vue')
const Category = () => import('../pages/List/Category.vue')
const Label = () => import('../pages/List/Label.vue')
const Task = () => import('../pages/List/Task.vue')
const Statistics = () => import('../pages/Statistics/Statistics.vue')

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
        },
        {
          path: '/addtask',
          name: 'addtask',
          component: Addtask
        },
        {
          path: '/comment',
          name: 'comment',
          component: Comment
        },
        {
          path: '/task',
          name: 'task',
          component: Task
        },
        {
          path: '/category',
          name: 'category',
          component: Category
        },
        {
          path: '/label',
          name: 'label',
          component: Label
        },
        {
          path: '/statistics',
          neme: 'statistics',
          component: Statistics
        }
      ]
    }
  ]
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  if (to.path == '/login') {
    return next()
  } else {
    if (!token) {
      return next('/login')
    } else {
      return next()
    }
  }
})


export default router
