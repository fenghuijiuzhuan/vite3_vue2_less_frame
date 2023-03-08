/*
 * @path        : \nita-wms-web\pages\wms\wmp\_provide\compose\Loading\index.js
 * @message     :
 * @Author      : YvanGuo
 */
import Vue from "vue";

Vue.prototype.$GoLoading = {};
Vue.prototype.$GoLoading.show = (
    content = "正在加载，请稍等...",
    options = {
        type: "ios-loading",
        size: 24,
        color: "#000",
    }
) => {
    Vue.prototype.$Spin.show({
        render: (h) => {
            return h("div", [
                h("Icon", {
                    class: "sh-view-loading__icon--load",
                    props: {
                        ...options,
                    },
                }),
                h(
                    "div",
                    {
                        style: {
                            fontSize: "18px",
                            ...options,
                        },
                    },
                    content
                ),
            ]);
        },
    });
};

Vue.prototype.$GoLoading.hide = () => {
    Vue.prototype.$Spin.hide();
};
