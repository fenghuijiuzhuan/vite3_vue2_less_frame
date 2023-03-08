export const routes = [
  {
    path: 'StoreManagement/inventory-manage/inventory-init',
    component: 'StoreManagement/inventory-manage/inventory-init/index.vue',
    name: 'inventoryInit',
    meta: {
      title: '初始化盘点',
    },
  },
  {
    path: 'Check/PlanCheck',
    component: 'Check/PlanCheck/index',
    name: 'PlanCheck',
    meta: {
      title: '计划盘点',
    },
  },
  {
    path: 'Check/PlanCheckDetail',
    component: 'Check/PlanCheckDetail/index.vue',
    name: 'PlanCheckDetail',
    meta: {
      title: '盘点详情',
    },
  },
  {
    path: 'StoreManagement/inventory-manage/TemporaryCheck',
    component: 'StoreManagement/inventory-manage/TemporaryCheck/index.vue',
    name: 'TemporaryCheck',
    meta: {
      title: '临时盘点',
    },
  },
  {
    path: 'StoreManagement/inventory-manage/inventory-adjustment',
    component: 'StoreManagement/inventory-manage/inventory-adjustment/index.vue',
    name: 'inventoryAdjustment',
    meta: {
      title: '盘点调整单',
    },
  },
];

export default routes;
