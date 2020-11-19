import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isShowLoading: false, // 全局 loading
        // 左侧菜单栏数据
        menuItems: [
            {
                name: 'home', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: '球场信息', // 文本内容
            },
            {
                name: 'recharge', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-albums', // icon类型
                text: '充值信息', // 点击侧边栏跳到一个单独的路由页面，需要提前在 router.js 定义
            },
            {
                name: 'other', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-egg-outline', // icon类型
                text: '会员信息', // 点击侧边栏跳到一个单独的路由页面，需要提前在 router.js 定义
            },
            {
                name: 'court', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-calendar', // icon类型
                text: '包场订单', // 点击侧边栏跳到一个单独的路由页面，需要提前在 router.js 定义
            },
            {
                name: 'rechargeorders', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-calendar', // icon类型
                text: '充值订单', // 点击侧边栏跳到一个单独的路由页面，需要提前在 router.js 定义
            },
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
        setLoading(state, isShowLoading) {
            state.isShowLoading = isShowLoading
        },
    },
})

export default store