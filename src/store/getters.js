export default {
  hasGetInfo: (state, getters, rootState) => {
    return rootState.user.hasGetInfo;
  },
  hasGetMenu: (state, getters, rootState) => {
    return rootState.app.hasGetMenu;
  },
  dynamicHomePage: (state, getters, rootState, rootGetters) => {
    return rootGetters.sourceRoutes && rootGetters.sourceRoutes[0] && rootGetters.sourceRoutes[0].name;
  },
  dynamicRoutes: (state, getters, rootState, rootGetters) => {
    return rootGetters.sourceRoutes;
  },
};
