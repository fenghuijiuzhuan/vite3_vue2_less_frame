import _ from 'lodash';
import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead,
} from '@/libs/util';
import { saveErrorLogger } from '@/api/data';
import router, { developmentorUseRoute } from '@/router';
import config from '@/config';
import { getMenu } from '@/api/user';
import { generateRoutes, transformObjToRoute } from '@/libs/filterAsyncMenu';

const { homeName } = config;

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route);
  state.tagNavList = state.tagNavList.filter((item) => {
    return !routeEqual(item, route);
  });
  router.push(nextRoute);
};

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    local: localRead('local'),
    errorList: [],
    hasReadErrorPage: false,
    sourceMenus: [],
    hasGetMenu: false,
  },
  getters: {
    menuList: (state) => generateRoutes(_.cloneDeep(state.sourceMenus)),
    errorCount: (state) => state.errorList.length,
    sourceRoutes: (state) => transformObjToRoute(_.cloneDeep(state.sourceMenus)),
  },
  mutations: {
    setAdminMenu(state, data) {
      state.hasGetMenu = true;
      state.sourceMenus = data;
    },
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName);
    },
    setTagNavList(state, list) {
      let tagList = [];
      if (list) {
        tagList = [...list];
      } else tagList = getTagNavListFromLocalstorage() || [];
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift();
      const homeTagIndex = tagList.findIndex((item) => item.name === homeName);
      if (homeTagIndex > 0) {
        const homeTag = tagList.splice(homeTagIndex, 1)[0];
        tagList.unshift(homeTag);
      }
      state.tagNavList = tagList;
      setTagNavListInLocalstorage([...tagList]);
    },
    closeTag(state, route) {
      const tag = state.tagNavList.filter((item) => routeEqual(item, route));
      route = tag[0] ? tag[0] : null;
      if (!route) return;
      closePage(state, route);
    },
    addTag(state, { route, type = 'unshift' }) {
      const router = getRouteTitleHandled(route);
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router);
        else if (router.name === homeName) state.tagNavList.unshift(router);
        else state.tagNavList.splice(1, 0, router);
        setTagNavListInLocalstorage([...state.tagNavList]);
      }
    },
    setLocal(state, lang) {
      localSave('local', lang);
      state.local = lang;
    },
    addError(state, error) {
      state.errorList.push(error);
    },
    setHasReadErrorLoggerStatus(state, status = true) {
      state.hasReadErrorPage = status;
    },
  },
  actions: {
    async getAdminMenu({ commit }) {
      if (import.meta.env.VITE_MODE === 'local') {
        const data = developmentorUseRoute;
        const res = { error: false, data, code: '0000', msg: '本地菜单路由' };
        commit('setAdminMenu', data);
        return res;
      }
      try {
        const { error, data, msg, code } = await getMenu({
          appCode: config.appCode,
        });
        if (!error) {
          commit('setAdminMenu', [data]);
        }
        return { error, data, msg, code };
      } catch (error) {
        console.error(error);
      }
    },
    addErrorLog({ commit, rootState }, info) {
      if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false);
      const {
        user: { token, userId, userName },
      } = rootState;
      const data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName,
      };
      saveErrorLogger(info).then(() => {
        commit('addError', data);
      });
    },
  },
};
