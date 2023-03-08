<template>
    <div>传递的打印数据【printDataPost】：{{ JSON.stringify(printDataPost) }}</div>
</template>

<script lang="jsx">
import { getLodop } from "../LodopFuncs";
import TemplateMixin from "./mixin";
export default {
    name: "tmp",
    mixins: [TemplateMixin],
    methods: {
        onPrint(name) {
            let LODOP = getLodop();
            if (!LODOP) return;

            if (LODOP.VERSION < "6.2.2.6" || CLODOP.CVERSION < "3.0.8.3") {
                return;
            }

            LODOP.PRINT_INIT("打印控件功能测试");
            LODOP.ADD_PRINT_HTM(88, 40, 321, 185, this.$el.innerHTML);
            LODOP.ADD_PRINT_HTM(87, 355, 285, 187, this.$el.innerHTML);

            if (this.isEnableWidgetPrint && !name) {
                LODOP.PREVIEW();
            } else {
                LODOP.SET_PRINTER_INDEXA(name);
                LODOP.PRINT();
            }
        },
    },
};
</script>

<style scoped>
.yv-print__show {
    display: none;
}
</style>
