import Vue from 'vue';
import VueRouter from 'vue-router';
import { basicRoutes, asyncRoutes } from './basic';
import LayoutDefault from '@/layout/Default';
import useRouter from './useRouter';

export const LAYOUT = LayoutDefault;

export const routes = [...basicRoutes];
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: import.meta.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export function resetRouter(router) {
  const createRouter = () =>
    new VueRouter({
      mode: 'hash',
      base: import.meta.env.BASE_URL,
      routes,
      scrollBehavior() {
        return { x: 0, y: 0 };
      },
    });
  // 用初始化的matcher替换当前router的matcher
  router.matcher = createRouter().matcher;
}

export const developmentorUseRoute = asyncRoutes;
export default router;

useRouter(router);
