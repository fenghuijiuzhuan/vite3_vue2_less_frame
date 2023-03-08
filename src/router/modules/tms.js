export const routes = [
  {
    path: 'TMS/LoadingWorkbench',
    component: 'TMS/LoadingWorkbench/index.vue',
    name: 'LoadingWorkbench',
    meta: {
      title: '装车调度管理',
    },
  },
  {
    path: 'TMS/ShipmentPlan',
    component: 'TMS/ShipmentPlan/index.vue',
    name: 'ShipmentPlan',
    meta: {
      title: '发运计划管理',
    },
  },
  {
    path: 'TMS/TruckManage',
    component: 'TMS/TruckManage/index.vue',
    name: 'TruckManage',
    meta: {
      title: '车辆管理',
    },
  },
  {
    path: 'TMS/CarrierManage',
    component: 'TMS/CarrierManage/index.vue',
    name: 'CarrierManage',
    meta: {
      title: '承运商管理',
    },
  },
  {
    path: 'TMS/ShipPathManage',
    component: 'TMS/ShipPathManage/index.vue',
    name: 'ShipPathManage',
    meta: {
      title: '发运路线管理',
    },
  },
  {
    path: 'TMS/DistributionRule',
    component: 'TMS/DistributionRule/index.vue',
    name: 'DistributionRule',
    meta: {
      title: '门店配送规则',
    },
  },
];

export default routes;
