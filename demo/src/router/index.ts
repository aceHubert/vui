import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/weui',
    name: 'demo-weui-index',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/index'),
  },
  {
    path: '/weui/navbar',
    name: 'demo-weui-tabbar',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/navbar'),
  },
  {
    path: '/weui/panel',
    name: 'demo-weui-panel',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/panel'),
  },
  // {
  //   path: '/weui/cascade-select',
  //   name: 'demo-weui-cascade-select',
  //   component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/cascade-select'),
  // },
  {
    path: '/weui/cell',
    name: 'demo-weui-cell',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/cell'),
  },
  {
    path: '/weui/switch',
    name: 'demo-weui-switch',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/switch'),
  },
  {
    path: '/weui/flexbox',
    name: 'demo-weui-flexbox',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/flexbox'),
  },
  {
    path: '/weui/grid',
    name: 'demo-weui-grid',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/grid'),
  },
  {
    path: '/weui/searchbar',
    name: 'demo-weui-searchbar',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/searchbar'),
  },
  {
    path: '/weui/button',
    name: 'demo-weui-button',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/button'),
  },
  {
    path: '/weui/checker',
    name: 'demo-weui-checker',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/checker'),
  },
  {
    path: '/weui/actionsheet',
    name: 'demo-weui-actionsheet',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/actionsheet'),
  },
  {
    path: '/weui/image',
    name: 'demo-weui-image',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/image'),
  },
  {
    path: '/weui/loadmore',
    name: 'demo-weui-loadmore',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/loadmore'),
  },
  {
    path: '/weui/loading',
    name: 'demo-weui-loading',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/loading'),
  },
  {
    path: '/weui/toast',
    name: 'demo-weui-toast',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/toast'),
  },
  {
    path: '/weui/dialog',
    name: 'demo-weui-dialog',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/dialog'),
  },
  {
    path: '/weui/alert',
    name: 'demo-weui-alert',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/alert'),
  },
  {
    path: '/weui/confirm',
    name: 'demo-weui-confirm',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/confirm'),
  },
  {
    path: '/weui/popover',
    name: 'demo-weui-popover',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/popover'),
  },
  {
    path: '/weui/slider',
    name: 'demo-weui-slider',
    component: () => import(/* webpackChunkName: "demo-weui" */ '@/views/slider'),
  },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
