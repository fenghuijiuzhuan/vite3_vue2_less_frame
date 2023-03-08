export const routes = [
  {
    path: 'Receiving/SignInManage',
    component: 'Receiving/SignInManage/index.vue',
    name: 'SignInManage',
    meta: {
      title: '预约管理',
    },
  },
  {
    path: 'Receiving/SignInSetting',
    component: 'Receiving/SignInSetting/index.vue',
    name: 'SignInSetting',
    meta: {
      title: '预约设置',
    },
  },
  {
    path: 'Receiving/IncomerNotice',
    component: 'Receiving/IncomerNotice/index.vue',
    name: 'IncomerNotice',
    meta: {
      title: '入库通知单管理',
    },
  },
  {
    path: 'Receiving/ReceivingTask',
    component: 'Receiving/ReceivingTask/index.vue',
    name: 'ReceivingTask',
    meta: {
      title: '收货任务管理',
    },
  },
  {
    path: 'Receiving/QualityInspectionTasks',
    component: 'Receiving/QualityInspectionTasks/index.vue',
    name: 'QualityInspectionTasks',
    meta: {
      title: '质检任务管理',
    },
  },
];

export default routes;
