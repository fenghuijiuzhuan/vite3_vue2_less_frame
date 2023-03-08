/*
 * @Author: intic
 * @Date: 2022-06-08 19:49:19
 * @Last Modified by: intic
 * @Last Modified time: 2022-06-09 19:24:04
 */
import Vue from "vue";
import AskDialog from "./index.vue";

function askModal({ delDialogIcon, delDialogMsg, callback, cancelCallback }) {
    this.status = "pending";
    this.options = {
        delDialogIcon,
        delDialogMsg,
        callback,
        cancelCallback,
    };
    let AskDialogModal = Vue.extend(AskDialog);
    let instance, el;

    instance = new AskDialogModal().$mount();
    el = instance.$el;
    this.instance = instance;
    this.el = el;
    document.body.appendChild(el);

    const cancelBtn = instance.cancelBtn;
    const confirmBtn = instance.confirmBtn;

    const self = this;
    instance.cancelBtn = function () {
        cancelBtn.call(instance, ...arguments);
        cancelCallback && cancelCallback();
        self.destroy();
    };

    instance.confirmBtn = function () {
        confirmBtn.call(instance, ...arguments);
        callback && callback(self);
    };

    instance.showModalFn(this.options);
}

askModal.prototype.cancel = function () {
    this.instance.isShow = false;
    this.destroy();
};

askModal.prototype.destroy = function () {
    this.status = null;
    this.options = null;
    this.instance = null;
};

Vue.prototype.$AskDialog = (options) => {
    return new askModal(options);
};
