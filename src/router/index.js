import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: () => import('@/views/index/index.vue'),
            redirect: '/index/map',
            children: [
                {
                    path: 'map',
                    component: () => import('@/views/map/map.vue')
                }
            ]
        },
        {
            path: '/login',
            component: () => import('@/views/login/login.vue')
        }
    ]
})