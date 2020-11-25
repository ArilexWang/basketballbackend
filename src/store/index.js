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
            {
                text: '日期', // 点击侧边栏跳到一个单独的路由页面，需要提前在 router.js 定义
                size: 18, // icon大小
                type: 'ios-calendar', // icon类型
                children: [
                    {
                        type: 'ios-notifications-outline',
                        name: 'sunday',
                        text: '星期天',
                    },
                    {
                        type: 'ios-notifications-outline',
                        name: 'monday',
                        text: '星期一',
                    },
                    {
                        type: 'ios-notifications-outline',
                        name: 'tuesday',
                        text: '星期二',
                    },
                    {
                        type: 'ios-notifications-outline',
                        name: 'wednesday',
                        text: '星期三',
                    },
                    {
                        type: 'ios-notifications-outline',
                        name: 'thursday',
                        text: '星期四',
                    },
                    {
                        type: 'ios-notifications-outline',
                        name: 'friday',
                        text: '星期五',
                    },
                    {
                        type: 'ios-notifications-outline',
                        name: 'saturday',
                        text: '星期六',
                    },
                ],
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