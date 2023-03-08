/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout;
  let argus;
  let context;
  let timestamp;
  let result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, argus);
        if (!timeout) {
          context = null;
          argus = null;
        }
      }
    }
  };

  return function (...args) {
    argus = args;
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, argus);
      context = null;
      argus = null;
    }

    return result;
  };
}

/**
 * ready
 */
export const ready = (function (p) {
  if (p) p();
  return function (f) {
    const isLoad = JSON.parse(window.sessionStorage.getItem('__isPageLoad'));
    if (isLoad) {
      if (typeof f === 'function') {
        f();
      }
      return;
    }
    const _f = window.onload;
    window.onload = function () {
      if (_f) _f();
      f();
      window.sessionStorage.setItem('__isPageLoad', true);
    };
    if (document.readyState === 'complete') {
      setTimeout(() => {
        window.onload();
        window.onload = null;
      }, 200);
    }
  };
})(() => {
  window.addEventListener('beforeunload', () => {
    window.sessionStorage.removeItem('__isPageLoad');
  });
});

export function downloadFile({ flow, fileName }) {
  const link = document.createElement('a');
  const blob = new Blob([flow]);
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = src;
    if (img.complete) {
      resolve(img);
    } else {
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        resolve();
      };
    }
  });
}

export function arrSortItem(arr, i, ii) {
  const arr_temp = [].concat(arr);
  arr_temp.splice(ii, 0, arr_temp.splice(i, 1)[0]);
  return arr_temp;
}

export function arrDeduplicate(list) {
  return [...new Set(list)];
}

export function obArrDeduplicate(list, key) {
  const _working = new Map();
  list.forEach((item) => {
    if (!_working.has(item[key])) {
      _working.set(item[key], item);
    }
  });
  return [..._working.values()];
}

export const isDOM = (function () {
  return typeof HTMLElement === 'object'
    ? (dom) => dom instanceof HTMLElement
    : (dom) => dom && typeof dom === 'object' && dom.nodeType === 1 && typeof dom.nodeName === 'string';
})();

/**
 * 过滤键值为空值的对象
 * @param {Object} obj 操作对象
 * @param {*} val 任意值
 * @param {Boolean} is_del 是否是不替换直接删除
 * @returns 过滤后的新对象
 */
export const filterObjEmptyKeyValue = function (obj, val, is_del = true) {
  const _obj = { ...obj };
  for (const key in _obj) {
    if (_obj[key] !== 0 && _obj[key] !== false && !_obj[key]) {
      if (is_del) {
        delete _obj[key];
      } else {
        _obj[key] = val;
      }
    }
  }
  return _obj;
};

/**
 * 将对象通过映射关系转换为新对象
 * @param {Object} source 原始对象
 * @param {MappingObject} mappingObj 映射关系
 * @returns 映射关系转换后的新对象
 */
export const obMappingToNewObByObKey = function (source, mappingObj) {
  const _result = JSON.parse(JSON.stringify(source));
  for (const i of Object.keys(mappingObj)) {
    if (_result.hasOwnProperty(i)) {
      _result[mappingObj[i]] = _result[i];
      delete _result[i];
    }
  }
  return _result;
};
