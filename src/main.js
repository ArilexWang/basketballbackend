import Vue from 'vue'
import axios from 'axios'
import ViewUI from 'view-design'
import ElementUI from 'element-ui'
import dateFormat from 'dateformat'
import cloudbase from '@cloudbase/js-sdk'
import App from './App'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css'
import './permission'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.use(ElementUI)

const app = cloudbase.init({
    env: 'test-3gyot3qv80f8b08e',
})
Vue.prototype.$app = app
Vue.prototype.$axios = axios
Vue.prototype.$dateFormat = dateFormat

const auth = app.auth({
    persistence: 'local',
})
if (auth.hasLoginState()) {
    console.log('haslogin')
    localStorage.setItem('token', 'abcd')
    // 此时已经登录
} else {
    console.log('has not login')
    auth.anonymousAuthProvider().signIn().then(() => {
        auth.getLoginState().then((res) => {
            if (res.isAnonymousAuth) {
                const expire = res.credential.accessTokenExpire
                console.log(new Date(expire))
                localStorage.setItem('token', res.accessToken)
            }
        })
    })
    // 此时未登录，执行您的登录流程
}

const vue = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})

export default vue