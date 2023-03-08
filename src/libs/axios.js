import axios from 'axios';
// import store from '@/store';
// import { Spin } from 'view-design'
import { useBaseUrlMapping, mapRes } from '@/config/postConf';

// const addErrorLog = (errorInfo) => {
//   const {
//     statusText,
//     status,
//     request: { responseURL },
//   } = errorInfo;
//   const info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL,
//   };
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info);
// };

const formatIns = useBaseUrlMapping(['resStatusCode', 'resMsg', 'resData']);

class HttpRequest {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
    this.queue = {};
    this.abortControllers = {};

    this.instance = this.create(this.getInsideConfig());
    this.interceptors(this.instance);
  }

  getInsideConfig() {
    const rconfig = {
      baseURL: this.baseUrl,
      // 指定请求超时的毫秒数
      timeout: 20000,
      // 表示跨域请求时是否需要使用凭证
      withCredentials: false,
      headers: {
        //
      },
    };
    return rconfig;
  }

  destroy(url) {
    delete this.queue[url];
    delete this.abortControllers[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[config.url] = true;
        // if (store.getters.isLogin) {
        //   config.headers.Authorization = storage.getItem(config.tokenKey);
        // }
        // console.log(config.headers);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    // 响应拦截
    instance.interceptors.response.use(
      (res) => {
        const { config } = res;
        this.destroy(config.url);
        const formatRes = formatIns(config.baseURL);
        const dataFormator = mapRes(res.data);
        const data = formatRes(dataFormator);
        console.log(data);
        return data;
      },
      (error) => {
        this.destroy(error.config.url);
        // let errorInfo = error.response;
        // if (!errorInfo) {
        //   const {
        //     request: { statusText, status },
        //     config,
        //   } = JSON.parse(JSON.stringify(error));
        //   errorInfo = {
        //     statusText,
        //     status,
        //     request: { responseURL: config.url },
        //   };
        // }
        // addErrorLog(errorInfo);
        return Promise.reject(error);
      },
    );
  }

  create(option) {
    return axios.create(option);
  }

  request(options) {
    if (this.abortControllers[options.url]) {
      this.abortControllers[options.url].abort();
    }
    const controller = new AbortController();
    this.abortControllers[options.url] = controller;
    return this.instance({ signal: controller.signal }, options);
  }

  post(url, data = {}, params = {}) {
    return this.request({
      method: 'post',
      url,
      data,
      params,
    });
  }

  get(url, params = {}) {
    return this.request({
      method: 'get',
      url,
      params,
    });
  }

  put(url, data = {}, params = {}) {
    return this.request({
      method: 'put',
      url,
      params,
      data,
    });
  }

  del(url, params = {}) {
    return this.request({
      method: 'delete',
      url,
      params,
    });
  }
}
export default HttpRequest;
