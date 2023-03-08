/*
 * @path        : \nita-wms-web\pages\wms\wmp\_provide\compose\Print\index.js
 * @message     :
 * @Author      : YvanGuo
 */
import PrinterPopup from "./popup";

export default {
    install: function (Vue) {
        let CPrinter;
        let instance, el;
        let isLoad = false;
        CPrinter = Vue.extend(PrinterPopup);
        instance = new CPrinter().$mount();

        Vue.prototype.$print = ({ printWay, tpl, printOptions, is_keep = false, callback }) => {
            if (!isLoad) {
                isLoad = true;
                el = instance.$el;
                document.body.appendChild(el);
            }

            // const removeEL = () => {
            //     instance.show = false
            //     setTimeout(() => {
            //         el.parentNode && el.parentNode.removeChild(el)
            //         el = null
            //         instance = null
            //         CPrinter = null
            //     }, 100)
            // }
            printOptions && (instance.printOptions = printOptions);
            if (printOptions.isSteam && !printOptions.isStepStart) return;

            printWay && (instance.printWay = printWay);
            tpl && (instance.tpl = tpl);

            const cancel = instance.cancel;
            const confirmBtn = instance.confirmBtn;

            instance.cancel = () => {
                cancel.call(instance);
                // removeEL()
                callback && callback();
            };

            instance.confirmBtn = (query) => {
                confirmBtn.call(instance, query);
                // !is_keep && removeEL()

                callback && callback(query);
            };

            instance.showModal();
        };
    },
};
