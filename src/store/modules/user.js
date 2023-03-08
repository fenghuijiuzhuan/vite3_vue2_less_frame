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
    // 登录
    async handleLogin({ commit }, loginForm) {
      if (import.meta.env.VITE_MODE === 'local') {
        const { error, data, msg, code } = {
          error: false,
          data: {
            expiresIn: 20000,
          },
          msg: '跳过登录',
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
    // 退出登录
    async handleLogOut({ actions }) {
      const { error, data, msg, code } = await logout();
      if (!error) {
        actions('clearAuth');
      }
      return { error, data, msg, code };
    },
    // 获取用户相关信息
    async getUserInfo({ commit }) {
      if (import.meta.env.VITE_MODE === 'local') {
        const { error, data, msg, code } = {
          error: false,
          data: {
            username: 'ggg',
          },
          msg: '跳过用户信息',
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
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount({ state, commit }) {
      getUnreadCount().then((res) => {
        const { data } = res;
        commit('setMessageCount', data);
      });
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
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
    // 根据当前点击的消息的id获取内容
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
    // 把一个未读消息标记为已读
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
    // 删除一个已读消息到回收站
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
    // 还原一个已删除消息到已读消息
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
