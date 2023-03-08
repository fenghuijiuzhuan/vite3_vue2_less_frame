export default {
  appCode: 'wms3',
  clientId: 'client-app',
  clientSecret: '123456',
  tokenKey: 'token',
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'WMS仓储管理系统3.0',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'Home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true, // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    },
  },
  baseUrlMapping: {
    // 用户中心
    '/user/api': {
      resStatusCode: {
        key: 'status',
        postor: (val) => {
          return val === 0 ? '0000' : val;
        },
      },
      resMsg: {
        key: 'msg',
      },
      resData: {
        key: 'data',
      },
    },
    // 默认
    [import.meta.env.VITE_PROXY_DOMAIN]: {
      resStatusCode: {
        key: 'code',
      },
      resMsg: {
        key: 'msg',
      },
      resData: {
        key: 'data',
      },
    },
  },
  // 数据映射处理
  // 取字段key的值，对象内可设计处理方式
  mapping: {
    // 接口返回统一
    resStatusCode: {
      key: 'code',
    },
    resMsg: {
      key: 'msg',
    },
    resData: {
      key: 'data',
    },
  },

  apiSuccessCode: '0000',
  apiRouteLoginCode: '-1023',
};
