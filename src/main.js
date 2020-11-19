import Vue from 'vue'
import axios from 'axios'
import ViewUI from 'view-design'
import ElementUI from 'element-ui'
import dateFormat from 'dateformat'
import App from './App'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css'
import './permission'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.use(ElementUI)

Vue.prototype.$axios = axios
Vue.prototype.$dateFormat = dateFormat

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})