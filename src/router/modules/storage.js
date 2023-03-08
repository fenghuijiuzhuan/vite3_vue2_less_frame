export const routes = [
  {
    path: 'StoreManagement/ContainerManage',
    component: 'StoreManagement/ContainerManage/index.vue',
    name: 'ContainerManage',
    meta: {
      title: '容器管理',
    },
  },
  {
    path: 'StoreManagement/OnShelfManagement',
    component: 'StoreManagement/OnShelfManagement/index.vue',
    name: 'OnShelfManagement',
    meta: {
      title: '上架管理',
    },
  },
  {
    path: 'StoreManagement/Replenishment',
    component: 'StoreManagement/Replenishment/index.vue',
    name: 'Replenishment',
    meta: {
      title: '补货管理',
    },
  },
  {
    path: 'StoreManagement/QueryInventory',
    component: 'StoreManagement/QueryInventory/index.vue',
    name: 'QueryInventory',
    meta: {
      title: '库存查询',
    },
  },
  {
    path: 'StoreManagement/StockTransferManagement',
    component: 'StoreManagement/StockTransferManagement/index.vue',
    name: 'StockTransferManagement',
    meta: {
      title: '移库管理',
    },
  },
  {
    path: 'StoreManagement/QualityAdjustment',
    component: 'StoreManagement/QualityAdjustment/index.vue',
    name: 'QualityAdjustment',
    meta: {
      title: '品质调整',
    },
  },
  {
    path: 'StoreManagement/OffShelfManagement',
    component: 'StoreManagement/OffShelfManagement/index.vue',
    name: 'OffShelfManagement',
    meta: {
      title: '下架管理',
    },
  },
  {
    path: 'StoreManagement/AllotManagement',
    component: 'StoreManagement/AllotManagement/index.vue',
    name: 'AllotManagement',
    meta: {
      title: '调拨管理',
    },
  },
  {
    path: 'StoreManagement/BreakageManagement',
    component: 'StoreManagement/BreakageManagement/index.vue',
    name: 'BreakageManagement',
    meta: {
      title: '报损管理',
    },
  },
];

export default routes;
