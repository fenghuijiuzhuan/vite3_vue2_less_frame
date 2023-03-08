export const routes = [
  {
    path: 'SalesReturn',
    component: 'Receiving/SalesReturn/index.vue',
    name: 'SalesReturn',
    meta: {
      title: '销售退货管理',
    },
  },
  {
    path: 'ReturnGoods',
    component: 'Dispatch/ReturnGoods/index.vue',
    name: 'ReturnGoods',
    meta: {
      title: '采购退货',
    },
  },
];

export default routes;
