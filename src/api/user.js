import requestCustom from '@/utils/request';

const request = requestCustom('/user/api');

export const login = (data) => {
  return request({
    url: 'login/v1',
    method: 'post',
    data,
  });
};

export const getUserInfo = () => {
  return request({
    url: '/get_by_token/v1',
    method: 'get',
  });
};

export const logout = () => {
  return request({
    url: '/logout/v1',
    method: 'get',
  });
};

// 查询所有资源列表（包含应用）
export const getMenu = (params) => {
  return request({
    url: '/list/resource/v1',
    method: 'get',
    params,
  });
};

export const getUnreadCount = () => {
  return request({
    url: 'message/count',
    method: 'get',
  });
};

export const getMessage = () => {
  return request({
    url: 'message/init',
    method: 'get',
  });
};

export const getContentByMsgId = (msg_id) => {
  return request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id,
    },
  });
};

export const hasRead = (msg_id) => {
  return request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id,
    },
  });
};

export const removeReaded = (msg_id) => {
  return request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id,
    },
  });
};

export const restoreTrash = (msg_id) => {
  return request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id,
    },
  });
};
