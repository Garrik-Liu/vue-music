// 核心库
import Vue from 'vue'
import Vuex from 'vuex';
import Router from 'vue-router'
import App from './App.vue'

// 全局样式
import 'common/style/index.scss';

// Vuex 和 Router 实例
import router from 'router';
import store from 'store';

// 第三方库
import VueLazyLoad from 'vue-lazyload';
import fastclick from 'fastclick';

// 配置参数设置
Vue.config.productionTip = false;

// 插件使用
Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueLazyLoad, {
    loading: require('common/images/loading.gif')
})
fastclick.attach(document.body);


// 创建 Vue 根实例
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')