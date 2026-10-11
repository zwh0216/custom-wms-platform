import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/index.vue'),
    meta: {
      title: '登录',
      requiredAuth: false,
    },
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/dashborad',
    component: () => import('@/view/layout/index.vue'),
    meta: {
      title: 'layout',
      requiredAuth: true,
    },
    children: [
      {
        path: 'dashborad',
        name: 'dashborad',
        component: () => import('@/view/dashborad/index.vue'),
        meta: {
          title: '首页',
          activeMenu: '/dashborad',
          requiredAuth: true,
        },
      },
      {
        path: 'order-management/sale-order',
        name: 'sale-order',
        component: () => import('@/view/sale-order/index.vue'),
        meta: {
          title: '销售订单',
          activeMenu: '/order-management/sale-order',
          requiredAuth: true,
        },
      },
      {
        path: '404',
        name: '404',
        component: () => import('@/view/not-find/index.vue'),
        meta: {
          title: '404',
          requiredAuth: true,
        },
      },
      {
        path: ':pathMatch(.*)*',
        redirect: '/404',
      },
    ],
  },
]
