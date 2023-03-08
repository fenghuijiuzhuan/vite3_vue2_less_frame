/*
 * @path        : \nita-wms-web\pages\wms\_provide\compose\PhotosPreview\index.js
 * @message     :
 * @Author      : yvangod
 */
import Preview from "./components/index.vue";

const PhotosPreview = {};
PhotosPreview.install = (Vue, options = {}) => {
    const PreviewController = Vue.extend(Preview);
    PreviewController.prototype.close = function () {
        this.data = [];
        this.options = {};
        this.imageIndex = 0;
    };
    Vue.prototype.$PhotosPreview = (opts = {}) => {
        const elem = document.createElement("div");
        let instance = new PreviewController();
        instance.$mount(elem);
        document.body.appendChild(instance.$el);
        instance.data = opts.images || [];
        instance.imageIndex = opts.index || 0;
        instance.options = opts.defaultOpt || {
            shareButtons: [
                {id:'download', label:'下载图片', url:'{{raw_image_url}}', download:true}
            ],
        };
        instance.$on("close", () => {
            document.body.removeChild(instance.$el);
            instance = null;
        });
    };
};
if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(PhotosPreview);
}
export default PhotosPreview;
