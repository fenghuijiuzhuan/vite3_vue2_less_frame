import vPath from 'path-browserify';
import _ from 'lodash';
import { LAYOUT } from '@/router/index';

export function generateRoutes({ menus, parentName = '', parentPath = '' }) {
  // todo  /micro/*  => MicroAPP
  if (!menus) return;
  return menus.map((menu) => {
    const name = transformRouteName(parentName, menu.path);
    const path = vPath.resolve(parentPath, menu.path);
    const component = getComponent(menu.component);
    return {
      path,
      name, // menu.name
      component,
      redirect: menu.redirect,
      meta: {
        orderNo: menu.sort,
        icon: menu.icon || 'ion:grid-outline',
        title: menu.title, // menu.title
        hideMenu: menu.hidden === 2,
        frameSrc: menu.frameSrc,
      },
      children: generateRoutes({
        menus: menu.children,
        parentName: name,
        parentPath: path,
      }),
    };
  });
}

function transformRouteName(parentName, routePath) {
  let nameStr = '';
  routePath.split('/').forEach((item) => {
    const arr = item.split('-');
    arr.forEach((str) => {
      if (str) nameStr += str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
    });
  });
  return `${parentName}_${nameStr}`;
}

function getComponent(component) {
  return `${component}/index.vue`;
}

export const loadView = (view) => {
  // 路由懒加载
  // import.meta.glob('../../views/**/*.{vue}')
  return () => import(`../views/${view}/index.vue`);
};

let dynamicViewsModules;
function asyncImportRoute(routes) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../views/**/*.vue');

  if (!routes) return;
  routes.forEach((item) => {
    const { component } = item;
    const { children } = item;
    if (component) {
      item.component = dynamicImport(dynamicViewsModules, component);
    }
    if (children) {
      asyncImportRoute(children);
    }
  });
}

function dynamicImport(dynamicViewsModules, component) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../views', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    );
  } else {
    console.warn(`在src/views/下找不到\`${component}.vue\`, 请自行创建!`);
    return 'EXCEPTION_COMPONENT';
  }
}

// Turn background objects into routing objects
export function transformObjToRoute(routeList) {
  routeList.forEach((route) => {
    const { component } = route;
    if (component) {
      route.children = [_.cloneDeep(route)];
      route.component = LAYOUT;
      route.name = `${route.name}Parent`;
      route.redirect = routeList[0].path;
      route.path = ``;
      // route.path = `${route.path}parent`;
      const meta = route.meta || {};
      meta.single = true;
      meta.affix = false;
      route.meta = meta;
    } else {
      console.warn(`请正确配置路由：${route?.name}的component属性`);
    }
    if (route.children) {
      asyncImportRoute(route.children);
    }
  });
  return routeList;
}
