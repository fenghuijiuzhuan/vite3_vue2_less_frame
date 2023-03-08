import storage from '@/utils/storage';
import config from '@/config/index';

export const getToken = () => {
  return storage.getItem(config.tokenKey);
};

export const setToken = (option) => {
  return storage.setItem(option);
};
