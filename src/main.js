import Vue from 'vue'
import mui from './assets/mui/js/mui.min.js'
import VueLazyload from 'vue-lazyload'
import loading from './common/images/loading.gif'
import './validate'
import store from './vuex/store'
import router from './router'
import  App from './App.vue'
import  API from './api'

import './assets/mui/fonts/mui.ttf'
import './assets/mui/fonts/mui-icons-extra.ttf'
import './assets/mui/css/mui.min.css'
import './assets/mui/css/style.css'

Vue.prototype.$mui = mui

// 将包含所有接口请求函数方法的对象保存到Vue原型对象上
Vue.prototype.$API = API

Vue.use(VueLazyload,{
    loading,
})

Vue.config.productionTip = true

new Vue({
    components:{App},
    template:'<App/>',
    router,
    store
}).$mount("#app")