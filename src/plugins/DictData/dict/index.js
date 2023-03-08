/*
 * @path        : \nita-wms-web\pages\wms\wmp\_provide\compose\DictData\dict\index.js
 * @message     :
 * @Author      : YvanGuo
 */
import Dict from "./Dict";

export default function (Vue, options) {
    Vue.mixin({
        data() {
            if (
                this.$options === undefined ||
                this.$options.dicts === undefined ||
                this.$options.dicts === null
            ) {
                return {};
            }
            const dict = new Dict();
            dict.owner = this;
            return {
                dict,
                dictLoaded: false,
            };
        },
        created() {
            if (!(this.dict instanceof Dict)) {
                return;
            }
            options.onCreated && options.onCreated(this.dict);
            this.dict.init(this.$options.dicts, options).then(() => {
                options.onReady && options.onReady(this.dict);
                this.$nextTick(() => {
                    this.dictLoaded = true;
                    this.$emit("dictReady", this.dict);
                    if (
                        this.$options.methods &&
                        this.$options.methods.onDictReady instanceof Function
                    ) {
                        this.$options.methods.onDictReady.call(this, this.dict);
                    }
                });
            });
        },
        methods: {
            getDictLabel(dictType, value) {
                const dictData = this.dict.type[dictType] || [];
                let data;
                if (typeof value === "string") {
                    const values = value.split(",");
                    data = values.map((itemValue) => {
                        const itemDict = dictData.find(
                            (item) => item.attrValue == itemValue
                        );
                        return itemDict ? itemDict.attrName : "";
                    });
                    return data.toString();
                } else {
                    data = dictData.find((item) => item.attrValue == value);
                    return data ? data.attrName : "";
                }
            },
        },
    });
}
