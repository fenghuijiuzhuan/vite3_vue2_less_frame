import Vue from 'vue';

import ViewUI from 'view-design';
import WmsWTable from '@c/WTable/index.vue';
import WmsDialogWrap from '@c/DialogWrap/index.vue';
import WmsButtonCamp from '@c/ButtonCamp/index.vue';
import WmsDictSelect from '@c/DictSelect/index.vue';
import WmsFilterWrap from '@c/FilterWrap/index.vue';
import WmsGoodsHeader from '@c/GoodsHeader/index.vue';
import WmsPanel from '@c/Panel/index.vue';
import WmsTitleLine from '@c/TitleLine/index.vue';
import WmsTab from '@c/Tab/index.vue';

import App from './App.vue';
import store from './store';
import router from './router';
import importDirective from '@/directive';
import config from '@/config';

import '@/style/theme/iview.css';
import '@/style/index.less';
import '@/assets/main.css';

import '@/plugins';

Vue.use(ViewUI, {
  size: 'default',
});
importDirective(Vue);

Vue.prototype.$config = config;

Vue.component('WmsWTable2', WmsWTable);
Vue.component('WmsDialogWrap', WmsDialogWrap);
Vue.component('WmsButtonCamp', WmsButtonCamp);
Vue.component('WmsDictSelect', WmsDictSelect);
Vue.component('WmsFilterWrap', WmsFilterWrap);
Vue.component('WmsGoodsHeader', WmsGoodsHeader);
Vue.component('WmsPanel', WmsPanel);
Vue.component('WmsTitleLine', WmsTitleLine);
Vue.component('WmsTab', WmsTab);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
