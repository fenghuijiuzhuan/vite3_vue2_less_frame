import Vue from 'vue';
import { Message } from 'view-design';
import router from '@/router/index';
// import Cookies from 'js-cookie';
import HttpRequest from '@/libs/axios';
import { filterObjEmptyKeyValue } from '@/utils/index.js';
import config from '@/config/index';

const baseUrl = import.meta.env.VITE_BASE_URL;
const instance = new HttpRequest(baseUrl);

// wms请求前后处理
async function request(_data, option) {
  if (_data.params) {
    _data.params = filterObjEmptyKeyValue(_data.params, null, false);
  }
  if (_data.data) {
    _data.data = filterObjEmptyKeyValue(_data.data, null, false);
  }
  const data = {
    // timeout: 1000 * 60

    ..._data,
  };
  if (data.method.toLowerCase() === 'delete') {
    const params = data.params || data.data;
    data.params = params;
    data.data = {};
    data.headers = {
      'Content-Type': 'x-www-form-urlencoded',
    };
  }
  return new Promise((resolve, reject) => {
    const delDialogData = option || data.delDialogData;
    if (delDialogData && JSON.stringify(delDialogData) !== '{}') {
      Vue.prototype.$AskDialog({
        ...delDialogData,
        async callback(ask) {
          try {
            resolve(postprocessor(data, ask.cancel.bind(ask)));
          } catch (error) {
            return reject(error);
          }
        },
        cancelCallback() {
          return resolve({ data: { status: 'cancel' } });
        },
      });
    } else {
      resolve(postprocessor(data));
    }
  });
}

async function postprocessor(option, callback) {
  try {
    const { code, data, msg } = await instance.request(option);
    if (callback) {
      callback();
    }
    if (code === config.apiRouteLoginCode) {
      console.log(123);
      router.push({
        name: 'Login',
      });
      return;
    }
    if (code !== config.apiSuccessCode) {
      Message.error({
        content: msg || '请求异常',
        duration: 5,
      });
    }
    return Promise.resolve({
      error: code !== config.apiSuccessCode,
      code,
      data,
      msg,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function beforeRequest(config = {}) {
  if (typeof config === 'string') {
    config = {
      baseURL: config,
    };
  }
  return (_data, option) => {
    return request({ ...config, ..._data }, option);
  };
}

export default beforeRequest;

// 导出常用函数

export const { post, get, put, del } = instance;
