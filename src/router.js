const routers = [{
    name: 'home',
    path: '/',
    meta: {
        title: '首页'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
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