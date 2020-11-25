import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('../components/Login.vue'),
    },
    {
        path: '/404',
        name: '404',
        meta: { title: '404' },
        component: () => import('../components/404.vue'),
    },
    { path: '/', redirect: '/home' },
]

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = {
    home: {
        path: 'home',
        name: 'home',
        meta: { title: '主页' },
        component: () => import('../views/Home.vue'),
    },
    other: {
        path: '/other', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'other',
        meta: { title: '会员信息' },
        component: () => import('../views/Other.vue'),
    },
    court: {
        path: '/court', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'court',
        meta: { title: '包场订单' },
        component: () => import('../views/CourtOrders.vue'),
    },
    recharge: {
        path: '/recharge', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'recharge',
        meta: { title: '充值信息' },
        component: () => import('../views/Recharge.vue'),
    },
    rechargeorders: {
        path: '/rechargeorders', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'rechargeorders',
        meta: { title: '充值订单' },
        component: () => import('../views/RechargeOrders.vue'),
    },
    monday: {
        path: '/monday', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'monday',
        meta: { title: '日期' },
        component: () => import('../views/Monday.vue'),
    },
    sunday: {
        path: '/sunday', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'sunday',
        meta: { title: '日期' },
        component: () => import('../views/Sunday.vue'),
    },
    tuesday: {
        path: '/tuesday', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'tuesday',
        meta: { title: '日期' },
        component: () => import('../views/Tuesday.vue'),
    },
    wednesday: {
        path: '/wednesday', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'wednesday',
        meta: { title: '日期' },
        component: () => import('../views/Wednesday.vue'),
    },
    thursday: {
        path: '/thursday', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'thursday',
        meta: { title: '日期' },
        component: () => import('../views/Thursday.vue'),
    },
    friday: {
        path: '/friday', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'friday',
        meta: { title: '日期' },
        component: () => import('../views/Friday.vue'),
    },
    saturday: {
        path: '/saturday', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'saturday',
        meta: { title: '日期' },
        component: () => import('../views/Saturday.vue'),
    },
    t1: {
        path: 't1',
        name: 't1',
        meta: { title: '表格' },
        component: () => import('../views/T1.vue'),
    },
    password: {
        path: 'password',
        name: 'password',
        meta: { title: '修改密码' },
        component: () => import('../views/Password.vue'),
    },
    msg: {
        path: 'msg',
        name: 'msg',
        meta: { title: '通知消息' },
        component: () => import('../views/Msg.vue'),
    },
    userinfo: {
        path: 'userinfo',
        name: 'userinfo',
        meta: { title: '用户信息' },
        component: () => import('../views/UserInfo.vue'),
    },
}

const createRouter = () => new Router({
    routes: commonRoutes,
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router