<!--
 * @path        : \nita-wms-web\pages\wms\_provide\compose\PhotosPreview\components\index.vue
 * @message     : vue组件
 * @Author      : yvangod
-->
<template>
    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <!-- Background of PhotoSwipe.
         It's a separate element, as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>

        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">
            <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
            <div class="pswp__container">
                <!-- don't modify these 3 pswp__item elements, data is added later on -->
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>

            <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <!--  Controls are self-explanatory. Order can be changed. -->

                    <div class="pswp__counter"></div>

                    <button
                        class="pswp__button pswp__button--close"
                        title="关闭"
                    ></button>

                    <button
                        class="pswp__button pswp__button--share"
                        title="分享"
                    ></button>

                    <button
                        class="pswp__button pswp__button--fs"
                        title="全屏"
                    ></button>

                    <button
                        class="pswp__button pswp__button--zoom"
                        title="缩放"
                    ></button>

                    <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
                    <!-- element will get class pswp__preloader--active when preloader is running -->
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
                >
                    <div class="pswp__share-tooltip"></div>
                </div>

                <button
                    class="pswp__button pswp__button--arrow--left"
                    title="上一张"
                ></button>

                <button
                    class="pswp__button pswp__button--arrow--right"
                    title="下一张"
                ></button>

                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="jsx">
import "../photoswipe/photoswipe.css";
import "../photoswipe/default-skin/default-skin.css";
import PhotoSwipe from "../photoswipe/photoswipe.js";
import PhotoSwipeUIDefault from "../photoswipe/photoswipe-ui-default.js";
export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        imageIndex: {
            type: Number,
            default: 0,
        },
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            gallery: null,
        };
    },
    watch: {
        data(newVal) {
            if (newVal.length > 0) {
                this.$nextTick(() => {
                    this.initPhotoSwipe();
                });
            }
        },
    },
    beforeDestroy() {
        // 销毁
        if (this.gallery) {
            this.gallery.close();
            this.gallery = null;
        }
    },
    methods: {
        async initPhotoSwipe() {
            var pswpElement = this.$el;
            var items = this.data.map((item) => {
                if (typeof item === "string") {
                    return this.loadImage(item).then((_img) => {
                        return {
                            src: item,
                            w: _img.width,
                            h: _img.height,
                        };
                    });
                }
                return Promise.resolve(item);
            });
            let { options, imageIndex } = this;

            // define options (if needed)
            var photoSwipeOptions = {
                maxSpreadZoom: 3,
                closeOnScroll: false,
                bgOpacity: 0.8,
                index: imageIndex,
                closeElClasses: [
                    // "close"
                    // "item",
                    // "caption",
                    // "zoom-wrap",
                    // "ui",
                    "top-bar",
                ],
                ...options,
            };

            items = await Promise.all(items);

            var gallery = new PhotoSwipe(
                pswpElement,
                PhotoSwipeUIDefault,
                items,
                photoSwipeOptions
            );
            gallery.init();
            this.gallery = gallery;

            this.gallery.listen("close", () => {
                if (this.gallery) {
                    this.gallery.close();
                    this.gallery = null;
                }
            });
            this.gallery.listen("destroy", () => {
                this.$emit("close");
            });
        },
        loadImage(src) {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                if (img.complete) {
                    resolve(img);
                } else {
                    img.onload = () => {
                        resolve(img);
                    };
                    img.onerror = () => {
                        resolve();
                    };
                }
            });
        },
    },
};
</script>

<style lang="scss" scope>
.pswp {
    z-index: 9999 !important;
    font-weight: bold;
}
.pswp__counter {
    opacity: 1;
}
.pswp__button {
    opacity: 0.8;
}
.pswp--animate_opacity,
.pswp__bg,
.pswp__caption,
.pswp__top-bar,
.pswp--has_mouse .pswp__button--arrow--left,
.pswp--has_mouse .pswp__button--arrow--right {
    -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
    transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
}
.pswp--open {
    -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
    transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
}
</style>
