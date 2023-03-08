/*
 * @path        : \nita-wms-web\pages\wms\wmp\_provide\compose\DictData\dict\Dict.js
 * @message     :
 * @Author      : YvanGuo
 */
import Vue from "vue";
/**
 * @classdesc 字典
 * @property {Object} label 标签对象，内部属性名为字典类型名称
 * @property {Array.<DictMeta>} _dictTypes 字典元数据数组
 */
export default class Dict {
    constructor() {
        this.owner = null;
        this.label = {};
        this.type = {};
    }

    init(options, { request }) {
        this.request = request;
        this._dictTypes = options;
        this._dictTypes.forEach((type) => {
            Vue.set(this.label, type, []);
            Vue.set(this.type, type, []);
        });
        return loadDicts(this, options);
    }

    /**
     * 重新加载字典
     * @param {String} type 字典类型
     */
    reloadDict(dictType) {
        const type = this._dictTypes.find((e) => e === dictType);
        if (type === undefined) {
            return Promise.reject(`the dict of ${type} was not found`);
        }
        return loadDicts(this, [type]);
    }
}

function loadDicts(dict, types) {
    return dict.request(types).then((response) => {
        dict.type = response;
        return dict.type;
    });
}
