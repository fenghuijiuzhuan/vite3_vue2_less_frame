import SpinVue from './main.vue';

const isDOM = (function () {
  return typeof HTMLElement === 'object'
    ? (dom) => {
      return dom instanceof HTMLElement;
    }
    : function (dom) {
      return dom && typeof dom === 'object' && dom.nodeType === 1 && typeof dom.nodeName === 'string';
    };
})();
class ViewLoading {
  constructor(Vue, id) {
    this.id = id;
    const Controller = Vue.extend(SpinVue);

    const instance = new Controller().$mount();
    const el = instance.$el;
    this.el = el;
    this.instance = instance;
  }

  show(options = {}, name = '.content-wrapper') {
    const parentView = isDOM(name)
      ? name
      : document.body.querySelector(name) || document.body.querySelector('.content-wrapper');
    if (!parentView) {
      console.error(`ViewLoading error: 父级容器未找到`);
    }
    parentView.style.position = 'relative';
    this.parentView = parentView;
    const props = this.instance.$props;
    const _options = { ...props, ...options };
    Object.keys(_options).forEach((i) => {
      this.instance[i] = _options[i];
    });
    parentView.appendChild(this.el);

    setTimeout(() => {
      this.instance.isShow = true;
    }, 200);
  }

  close() {
    this.instance.isShow = false;

    setTimeout(() => {
      this.parentView.removeChild(this.el);
      this.parentView.style.position = 'unset';
      this.instance = null;
      this.parentView = null;
      this.el = null;
    }, 200);
  }
}

export default {
  install: (Vue) => {
    Vue.prototype.$VLoading = {
      instances: [],
      show(options, el) {
        const id = this.instances.length + 1;

        const instance = new ViewLoading(Vue, id);
        this.instances.push(instance);
        instance.show(options, el);
        return instance;
      },
      hide(id) {
        if (id) {
          return this.close(id);
        }
        // 关闭最后一个打开的loading
        if (!this.instances.length) return;
        this.close(this.instances[this.instances.length - 1]);
      },
      close(ins) {
        // 关闭指定的loading
        if (!ins) return;
        if (typeof ins !== 'number') {
          const { id } = ins;
          ins = id;
        }
        const index = this.instances.findIndex((instance) => instance.id === ins);
        if (index < 0) return;
        const instance = this.instances[index];
        if (!instance) return;
        instance.close();
        this.instances.splice(index, 1);
      },
      clear() {
        // 关闭全部的loading
        this.instances.forEach((instance) => {
          instance.close();
        });
        this.instances = [];
      },
    };
  },
};
