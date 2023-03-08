import ViewUI from 'view-design';
import store from '@/store';
import { getToken } from '@/libs/auth';
import config from '@/config';

const { homeName } = config;
export default function (router) {
  const LOGIN_PAGE_NAME = 'Login';
  const whiteList = ['Login'];

  router.beforeEach(async (to, from, next) => {
    ViewUI.LoadingBar.start();
    if (getToken()) {
      // try {

      if (to.name === LOGIN_PAGE_NAME) {
        if (!store.getters.hasGetInfo) {
          await store.dispatch('getUserInfo');
        }
        if (!store.getters.hasGetMenu) {
          await store.dispatch('getAdminMenu');
          router.addRoute(store.getters.dynamicRoutes);
          router.addRoute({
            path: '/(.*)',
            redirect: '/404',
          });
        }
        next({
          name: store.getters.dynamicHomePage || homeName,
          replace: true,
        });
      } else if (store.getters.hasGetMenu && store.getters.hasGetMenu) {
        if (to.path === '') {
          next({
            name: store.getters.dynamicHomePage || homeName,
            replace: true,
          });
        } else {
          next();
        }
      } else {
        if (!store.getters.hasGetInfo) {
          await store.dispatch('getUserInfo');
        }
        if (!store.getters.hasGetMenu) {
          await store.dispatch('getAdminMenu');
          store.getters.dynamicRoutes.forEach((item) => {
            router.addRoute(item);
          });
          router.addRoute({
            path: '/(.*)',
            redirect: '/404',
          });
          console.log(store.getters.dynamicRoutes, router.getRoutes());
        }
        next({ ...to, replace: true });
      }
      // } catch (error) {
      //   console.error(error);
      //   ViewUI.LoadingBar.finish();
      //   await store.dispatch('clearAuth');
      //   next({
      //     name: LOGIN_PAGE_NAME,
      //   });
      // }
    } else if (whiteList.indexOf(to.name) !== -1) {
      next();
    } else {
      next({
        name: LOGIN_PAGE_NAME,
        redirect: to.name,
      });
    }
  });

  router.afterEach((to) => {
    // setTitle(to, router.app);
    ViewUI.LoadingBar.finish();
    window.scrollTo(0, 0);
  });
}
