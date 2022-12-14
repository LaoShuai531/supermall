import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由的懒加载
const Home = () => import('@/views/home/Home.vue')
const Category = () => import('@/views/category/Category.vue')
const Shopcart = () => import('@/views/shopcart/Shopcart.vue')
const Profile = () => import('@/views/profile/Profile.vue')
const Detail = () => import('@/views/detail/Detail.vue')

// 1. 安装插件
Vue.use(VueRouter)

// 2. 创建路由对象
const routes = [
    {
        path: '',
        // 重定向
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/category',
        component: Category,
    },
    {
        path: '/shopcart',
        component: Shopcart,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/detail/:iid',
        component: Detail,
    }
]

// 2. 创建router
const router = new VueRouter({
    routes,
    mode: 'history'
})

// 3.将router对象导出传入到Vue实例中
export default router