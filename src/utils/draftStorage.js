// 查找对应key的所有草稿，一般列表用
export function getDraftStorageArray(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}
// id查找对应key的草稿状态某个草稿
export function getDraftStorage(key, id, idKey = 'id') {
  const storageArr = getDraftStorageArray(key);
  return storageArr.find((item) => item[idKey] === id);
}
// 新增对应key的草稿
export function addDraftStorage(key, value = {}, idKey = 'id') {
  const storageArr = getDraftStorageArray(key);
  const storage = {
    [idKey]: 0 - (storageArr.length + 1), // id从0开始递减
    status: -1, // 草稿状态为-1
    ...value,
  };
  storageArr.push(storage);
  localStorage.setItem(key, JSON.stringify(storageArr));
}
// 删除
export function delDraftStorage(key, id, idKey = 'id') {
  const storageArr = getDraftStorageArray(key);
  if (storageArr.length > 0) {
    const delIndex = storageArr.findIndex((item) => item[idKey] === id);
    storageArr.splice(delIndex, 1);
    localStorage.setItem(key, JSON.stringify(storageArr));
  }
}
// 改
export function updateDraftStorage(key, value, idKey) {
  if (!value) {
    value = {};
  }
  const storageArr = getDraftStorageArray(key);
  const updateIndex = storageArr.findIndex((item) => item[idKey] === value[idKey]);
  storageArr[updateIndex] = { ...value, status: -1 };
  localStorage.setItem(key, JSON.stringify(storageArr));
}
