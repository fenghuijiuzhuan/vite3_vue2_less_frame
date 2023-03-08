import Vue from 'vue';
import '@/assets/common/index.less';
import './DictData';
import './AskDialog/index.js';
import './Loading';
import PrintPlugin from './Print';
import PhotosPreview from './PhotosPreview';
import { downloadFile, loadImage } from '@/utils';
import ViewLoadingPlugin from './ViewLoading';
import ErrorStore from './ErrorStore';

Vue.use(PrintPlugin);
Vue.use(PhotosPreview);
Vue.use(ViewLoadingPlugin);
Vue.use(ErrorStore);
Vue.prototype.$DownloadFile = downloadFile;
Vue.prototype.$LoadImage = loadImage;
