import config from './index';

const { mapping, baseUrlMapping } = config;

export const useBaseUrlMapping = (keys) => {
  const map = (fn) => {
    return keys.map(fn);
  };
  return (baseUrl) => {
    const resData = baseUrlMapping[baseUrl];
    const resKeys = mapping;

    return (mapRes) => {
      const resultArr = mapRes(map, resData, resKeys);
      return Object.assign({}, ...resultArr);
    };
  };
};

export function mapRes(obj) {
  return (map, resData, resKeys) => {
    const processor = processRes(resData, resKeys, obj);
    return map(processor);
  };
}

function processRes(resData, resKeys, obj) {
  return (key) => {
    const source = resData[key];
    const target = resKeys[key];
    const { key: sKey, postor: sPostor } = source;
    const { key: tKey, postor: tPostor } = target;

    let tValue = obj[sKey];
    if (sPostor) {
      tValue = sPostor(tValue);
    }
    if (tPostor) {
      tValue = tPostor(tValue);
    }
    return {
      [tKey]: tValue,
    };
  };
}
