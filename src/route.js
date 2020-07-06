import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/main'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'main',
            component: MainPage
        }, {
            path: '/edit',
            name: 'edit',
            component: Edit,
            props: true
        }

    ]
})