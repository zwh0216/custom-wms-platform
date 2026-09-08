import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/view/layout/index.vue'),
    meta: {
      title: 'layout',
      requiredAuth: true,
    },
    children: [
      {
        path: 'dashborad',
        name: 'dashborad',
        component: () => import('@/view/layout/index.vue'),
        meta: {
          title: '首页',
          activeMenu: '/dashborad',
          requiredAuth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/index.vue'),
    meta: {
      title: '登录',
      requiredAuth: false,
    },
  },
]
