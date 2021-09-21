import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/login/login";
import Main from "@/views/main/index"
//gly
import SpAbnormalcomplaint from '../views/aftersales/spAbnormalcomplaint/index.vue'
import SpChangegoods from '../views/aftersales/spChangegoods/index.vue'
import SpComplaintsrecord from '../views/aftersales/spComplaintsrecord/index.vue'
import SpOutwarehouse from '../views/aftersales/spOutwarehouse/index.vue'
import SpReturnwarehouse from '../views/aftersales/spReturnwarehouse/index.vue'
import SpReturngoods from '../views/aftersales/spReturngoods/index.vue'
import AddOrEditChangegoods from '../views/aftersales/spChangegoods/addOrEditChangegoods/index.vue'
import AddOrEditReturngoods from '../views/aftersales/spReturngoods/addOrEditRetrungoods/index.vue'
import AddOrEditOutwarehouse from '../views/aftersales/spOutwarehouse/addOrEditOutwarehouse/index.vue'
import AddOrEditReturnwarehouse from '../views/aftersales/spReturnwarehouse/addOrEditReturnwarehouse/index.vue'
//------------------------------------
Vue.use(VueRouter)

const routes = [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }

    {
        path: '/',
        name: 'Login',
        component: login
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        children: [
            //售后 gly
            {
                path: '/spAbnormalcomplaint',
                name: 'SpAbnormalcomplaint',
                component: SpAbnormalcomplaint
            },
            {
                path: '/spChangegoods',
                name: 'SpChangegoods',
                component: SpChangegoods,
            },
            {
                path: '/spComplaintsrecord',
                name: 'SpComplaintsrecord',
                component: SpComplaintsrecord
            },
            {
                path: '/spOutwarehouse',
                name: 'SpOutwarehouse',
                component: SpOutwarehouse
            },
            {
                path: '/spReturngoods',
                name: 'SpReturngoods',
                component: SpReturngoods
            },
            {
                path: '/spReturnwarehouse',
                name: 'SpReturnwarehouse',
                component: SpReturnwarehouse
            },
            {
                path: '/addOrEditChangegoods',
                name: 'AddOrEditChangegoods',
                component: AddOrEditChangegoods
            },
            {
                path: '/addOrEditReturngoods',
                name: 'AddOrEditReturngoods',
                component: AddOrEditReturngoods
            },
            {
                path: '/addOrEditOutwarehouse',
                name: 'AddOrEditOutwarehouse',
                component: AddOrEditOutwarehouse
            },
            {
                path: '/addOrEditReturnwarehouse',
                name: 'AddOrEditReturnwarehouse',
                component: AddOrEditReturnwarehouse
            },


            //chy
            {
                path: "/brand",
                name: "Brand",
                component: () => import(/* webpackChunkName: "about" */ '../views/goods/goods/brand/index.vue')
            },
            {
                path: "/classify",
                name: "Classify",
                component: () => import(/* webpackChunkName: "about" */ '../views/goods/goods/classify/index.vue')
            },
            {
                path: "/product",
                name: "Product",
                component: () => import(/* webpackChunkName: "about" */ '../views/goods/goods/product/index.vue')
            },
            {
                path: "/goods",
                name: "Goods",
                component: () => import(/* webpackChunkName: "about" */ '../views/goods/goods/goods/goods')
            },
            {
                path: "/goods2gift",
                name: "Goods",
                component: () => import(/* webpackChunkName: "about" */ '../views/goods/goods/goods/goods2gift')
            },
            {
                path: "/adjust",
                name: "Adjust",
                component: () => import(/* webpackChunkName: "about" */ '../views/goods/goods/adjust/index.vue')
            },

            //    ydw
            {
                path: '/gift',
                name: 'gift',
                component: () => import('../views/goods/gift/Index')
            }, {
                path: '/gift2good',
                name: 'gift2good',
                component: () => import('../views/goods/gift/gift2Good')
            }, {
                path: '/promote',
                name: 'promote',
                component: () => import('../views/goods/gift/promote')
            },

            //wq
            {
                path: '/sales/order',
                name: 'order',
                component: () => import('@/views/sales/order/index.vue'),
            },
            {
                path: '/sales/onlineorder',
                name: 'onlineorder',
                component: () => import('@/views/sales/onlineorder/index.vue'),
            },
            {
                path: '/sales/salesdelivery',
                name: 'salesdelivery',
                component: () => import('@/views/sales/salesdelivery/index.vue'),
            },
            {
                path: '/sales/salesdeliveryreport',
                name: 'salesdeliveryreport',
                component: () => import('@/views/sales/salesdeliveryreport/index.vue'),
            },
            {
                path: '/sales/returned',
                name: 'returned',
                component: () => import('@/views/sales/returned/index.vue'),
            },
            {
                path: '/sales/returnedreport',
                name: 'returnedreport',
                component: () => import('@/views/sales/returnedreport/index.vue'),
            },
            //    hw
            {
                path: '/salesPut',
                name: '入库订单查询',
                component: () => import(/* webpackChunkName: "about" */ '../views/stock/aftersale/salesPut')
            }, {
                path: '/afterSinglePut',
                name: '入库单',
                component: () => import(/* webpackChunkName: "about" */ '../views/stock/aftersale/AfterSinglePut')
            }

        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
