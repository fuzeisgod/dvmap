import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: () => import('@/views/index/index.vue'),
            redirect: '/map',
            children: [
                {
                    path: 'map',
                    component: () => import('@/views/map/map.vue')
                }
            ]
        }
    ]
})