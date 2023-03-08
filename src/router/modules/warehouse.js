export const routes = [
  {
    path: 'Warehouse/Allocation',
    component: 'Warehouse/Allocation/index.vue',
    name: 'Allocation',
    meta: {
      title: '货位管理',
    },
  },
  {
    path: 'Warehouse/Manage',
    component: 'Warehouse/Manage/index.vue',
    name: 'WarehouseManage',
    meta: {
      title: '仓库管理',
    },
  },
  {
    path: 'Warehouse/Area',
    component: 'Warehouse/Area/index.vue',
    name: 'WarehouseArea',
    meta: {
      title: '库区管理',
    },
  },
  {
    path: 'Warehouse/CommodityDisplay',
    component: 'Warehouse/CommodityDisplay/index.vue',
    name: 'CommodityDisplay',
    meta: {
      title: '商品货位陈列管理',
    },
  },
];

export default routes;
