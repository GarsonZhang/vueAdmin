import config from '../src/config/config';

const routers = [{
    name: 'index',
    path: config.root + '/',
    meta: {
        title: '首页',
        title_tw:'首頁',
        title_en:'home',
        title_other:'首页'
    },
    component: (resolve) => require(['./views/index.vue'], resolve),
    children:[{
        name:'home',
        path:config.root + '/home',
        meta: { 
            title:'首页',
            title_tw:'首頁',
            title_en:'home',
            title_other:'首页'
         },
        component: (resolve) => require(['./views/home.vue'], resolve)
    },
    { path: config.root + '/', redirect: config.root + '/home' }]
},
{
    name: 'login',
    path: config.root + '/Login/:redirect',
    meta: {
        title: '登录',
        title_tw:'登錄',
        title_en:'login',
        title_other:'登录'
    },
    component: (resolve) => require(['./views/login.vue'], resolve)
},
{
    name: 'loginIndex',
    path: config.root + '/Login',
    meta: {
        title: '登录',
        title_tw:'登錄',
        title_en:'login',
        title_other:'登录'
    },
    component: (resolve) => require(['./views/login.vue'], resolve)
},
{
    name: 'test',
    path: config.root + '/test',
    meta: {
        title: '测试',
        title_tw:'測試',
        title_en:'test',
        title_other:'测试'
    },
    component: (resolve) => require(['./views/test.vue'], resolve)
}
];

export default routers;