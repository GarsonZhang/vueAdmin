const routers = [{
    name: 'index',
    path: '/',
    meta: {
        title: '首页'
    },
    component: (resolve) => require(['./views/index.vue'], resolve),
    children:[{
        name:'home',
        path:'/home',
        meta: { title:'首页' },
        component: (resolve) => require(['./components/page/home.vue'], resolve)
    },
    { path: '/', redirect: '/home' }]
},
{
    name: 'login',
    path: '/Login',
    meta: {
        title: '登录'
    },
    component: (resolve) => require(['./views/login.vue'], resolve)
}
];

export default routers;