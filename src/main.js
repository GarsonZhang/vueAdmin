import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
//import axios from 'axios';
import gziview from './components/global';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

Vue.use(gziview);

// Vue.prototype.$axios = axios;
// axios.defaults.baseURL = 'http://' + window.location.hostname + ':' + window.location.port + '/data/';
// axios.defaults.timeout = 3000;

Vue.prototype.$utils = Util;

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
    //routes: Util.convertRouteMap()
};
const router = new VueRouter(RouterConfig);


router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
const store = new Vuex.Store({
    state: {
        cachePage: []
    },
    getters: {

    },
    mutations: {
        closePage(state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        increateTag(state, tagObj) {
            state.cachePage.push(tagObj.name);
        },
        clearAllTags(state) {
            state.cachePage.splice(1, state.cachePage.length);
        },
        clearOtherTags(state, name) {
            let currentIndex = -1;
            for (var i = 0; i < state.cachePage.length; i++) {
                if (state.cachePage[i] === name) {
                    currentIndex = i;
                    break;
                }
            }
            if (currentIndex === 0) {
                this.clearAllTags(state);
            } else {
                state.cachePage.splice(currentIndex + 1);
                state.cachePage.splice(1, currentIndex - 1);
            }
        },
    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    created() {
        // console.log('main.js   created');

        // var menuData=[{
        //     name:'system',
        //     path: '/system',
        //     meta: {
        //         title: '系统'
        //     },
        //     component: (resolve) => require(['./views/index.vue'], resolve),
        //     children: [{
        //         name: 'about',
        //         path: '/system/about',
        //         meta: {
        //             title: '关于'
        //         },
        //         component: resolve => {
        //             return require(['./components/page/about.vue'], resolve);
        //         }
        //     }]
        // }];
        // debugger
        // this.$router.options.routes.push(menuData);
        // this.$router.addRoutes(menuData);
    }
});