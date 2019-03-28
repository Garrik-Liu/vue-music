// 核心库
import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

// 自定义配置文件
import routes from 'router';
import 'common/style/index.scss';

// 第三方库
import VueLazyLoad from 'vue-lazyload';
import fastclick from 'fastclick';

// 配置参数设置
Vue.config.productionTip = false;

// 插件使用
Vue.use(Router);
Vue.use(VueLazyLoad, {
    loading: require('common/images/loading.gif')
})
fastclick.attach(document.body);

// 创建路由
const router = new Router({
    routes
})

// 创建 Vue 根实例
new Vue({
    render: h => h(App),
    router
}).$mount('#app')