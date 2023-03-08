export const routes = [
  {
    path: 'Dispatch/DeliveryPlan',
    component: 'Dispatch/DeliveryPlan/index.vue',
    name: 'DeliveryPlan',
    meta: {
      title: '出库计划单管理',
      showNav: true,
    },
  },
  {
    path: 'Dispatch/DeliveryWorkbench',
    component: 'Dispatch/DeliveryWorkbench/index.vue',
    name: 'DeliveryWorkbench',
    meta: {
      title: '发货工作台',
      showNav: true,
    },
  },
  {
    path: 'Dispatch/PickWorkbenchTotal',
    component: 'Dispatch/PickWorkbenchTotal/index.vue',
    name: 'PickWorkbenchTotal',
    meta: {
      title: '拣货工作台-统计',
      showNav: true,
    },
  },
  {
    path: 'Dispatch/PickWorkbenchTask',
    component: 'Dispatch/PickWorkbenchTask/index.vue',
    name: 'PickWorkbenchTask',
    meta: {
      title: '拣货工作台-任务',
      showNav: true,
    },
  },
  {
    path: 'Dispatch/ReviewCheckBuild',
    component: 'Dispatch/ReviewCheckBuild/index.vue',
    name: 'ReviewCheckBuild',
    meta: {
      title: '复核打包工作台',
      showNav: true,
    },
  },
];

export default routes;
