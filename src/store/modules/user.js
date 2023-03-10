import {
  login,
  logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  getUnreadCount,
} from '@/api/user';
import config from '@/config/index';
// import { setToken, getToken } from '@/libs/util';
import storage from '@/utils/storage';

export default {
  state: {
    userInfo: {},
    token: storage.getItem(config.tokenKey),
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {},
  },
  mutations: {
    setUserInfo(state, data = {}) {
      state.hasGetInfo = true;
      state.userInfo = data;
      storage.setItem({
        name: 'userInfo',
        value: JSON.stringify(data),
      });
    },
    setToken(state, { token, expires }) {
      state.token = token;
      storage.setItem({
        name: config.tokenKey,
        value: token,
        expires,
      });
    },
    removeToken(state, token) {
      state.token = '';
      storage.removeItem(token);
    },
    setMessageCount(state, count) {
      state.unreadCount = count;
    },
    setMessageUnreadList(state, list) {
      state.messageUnreadList = list;
    },
    setMessageReadedList(state, list) {
      state.messageReadedList = list;
    },
    setMessageTrashList(state, list) {
      state.messageTrashList = list;
    },
    updateMessageContentStore(state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content;
    },
    moveMsg(state, { from, to, msg_id }) {
      const index = state[from].findIndex((_) => _.msg_id === msg_id);
      const msgItem = state[from].splice(index, 1)[0];
      msgItem.loading = false;
      state[to].unshift(msgItem);
    },
  },
  getters: {
    messageUnreadCount: (state) => state.messageUnreadList.length,
    messageReadedCount: (state) => state.messageReadedList.length,
    messageTrashCount: (state) => state.messageTrashList.length,
    isLogin: () => !!storage.getItem(config.tokenKey),
  },
  actions: {
    resetState({ state }) {
      state.userInfo = {};
      state.hasGetInfo = false;
    },
    clearAuth({ commit, actions }) {
      commit('removeToken', config.tokenKey);
      actions('resetState');
    },
    // ??????
    async handleLogin({ commit }, loginForm) {
      if (import.meta.env.VITE_MODE === 'local') {
        const { error, data, msg, code } = {
          error: false,
          data: {
            expiresIn: 20000,
          },
          msg: '????????????',
          code: '0000',
        };
        if (!error) {
          const { expiresIn } = data;
          commit('setToken', { token: expiresIn, expires: expiresIn * 1000 });
        }
        return { error, data, msg, code };
      }
      const { error, data, msg, code } = await login(loginForm);
      if (!error) {
        const { expiresIn } = data;
        commit('setToken', { token: expiresIn, expires: expiresIn * 1000 });
      }
      return { error, data, msg, code };
    },
    // ????????????
    async handleLogOut({ actions }) {
      const { error, data, msg, code } = await logout();
      if (!error) {
        actions('clearAuth');
      }
      return { error, data, msg, code };
    },
    // ????????????????????????
    async getUserInfo({ commit }) {
      if (import.meta.env.VITE_MODE === 'local') {
        const { error, data, msg, code } = {
          error: false,
          data: {
            username: 'ggg',
          },
          msg: '??????????????????',
          code: '0000',
        };
        if (!error) {
          commit('setUserInfo', data);
        }
        return { error, data, msg, code };
      }
      const { error, data, msg, code } = await getUserInfo();
      if (!error) {
        commit('setUserInfo', data);
      }
      return { error, data, msg, code };
    },
    // ???????????????????????????????????????????????????????????????????????????????????????
    getUnreadMessageCount({ state, commit }) {
      getUnreadCount().then((res) => {
        const { data } = res;
        commit('setMessageCount', data);
      });
    },
    // ????????????????????????????????????????????????????????????????????????
    getMessageList({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage()
          .then((res) => {
            const { unread, readed, trash } = res.data;
            commit(
              'setMessageUnreadList',
              unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)),
            );
            commit(
              'setMessageReadedList',
              readed
                .map((_) => {
                  _.loading = false;
                  return _;
                })
                .sort((a, b) => new Date(b.create_time) - new Date(a.create_time)),
            );
            commit(
              'setMessageTrashList',
              trash
                .map((_) => {
                  _.loading = false;
                  return _;
                })
                .sort((a, b) => new Date(b.create_time) - new Date(a.create_time)),
            );
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // ??????????????????????????????id????????????
    getContentByMsgId({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        const contentItem = state.messageContentStore[msg_id];
        if (contentItem) {
          resolve(contentItem);
        } else {
          getContentByMsgId(msg_id).then((res) => {
            const content = res.data;
            commit('updateMessageContentStore', { msg_id, content });
            resolve(content);
          });
        }
      });
    },
    // ????????????????????????????????????
    hasRead({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id)
          .then(() => {
            commit('moveMsg', {
              from: 'messageUnreadList',
              to: 'messageReadedList',
              msg_id,
            });
            commit('setMessageCount', state.unreadCount - 1);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // ????????????????????????????????????
    removeReaded({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id)
          .then(() => {
            commit('moveMsg', {
              from: 'messageReadedList',
              to: 'messageTrashList',
              msg_id,
            });
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // ??????????????????????????????????????????
    restoreTrash({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id)
          .then(() => {
            commit('moveMsg', {
              from: 'messageTrashList',
              to: 'messageReadedList',
              msg_id,
            });
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
