<template>
    <div>
        <template v-for="(list, idx) in printDataPost">
            <div
                v-for="(o, index) in list"
                :key="index"
                :style="`width: ${previewWidth};height: ${previewHeight};position: relative;margin: 10px auto;border: 1px dashed #ccc;padding: ${
                    marginBoxScale.t
                } ${marginBoxScale.r} ${marginBoxScale.b} ${
                    marginBoxScale.l
                };zoom: ${1 / scale}`"
            >
                <div
                    :id="`print-page${idx}-${index}`"
                    :style="`width: ${contentPreviewWidth};height: ${contentPreviewHeight}; ${
                        hasBorder && 'border:' + border + ';'
                    } ;box-sizing: border-box;font-size: 24px;color: #000;line-height: 1.1; display: flex; align-items: center`"
                >
                    <div style="width: 100%">
                        <div
                            class="col"
                            style="display: flex; align-items: center"
                        >
                            <div class="label" style="flex: 0 0 auto">
                                收货：
                            </div>
                            <div
                                class="content"
                                style="
                                    width: 100%;
                                    flex: 1 1 auto;
                                    font-size: 36px;
                                    font-weight: bold;
                                    white-space: nowrap;
                                "
                            >
                                {{ o.receiverName }}
                            </div>
                        </div>
                        <div style="display: flex">
                            <div class="col" style="width: 50%; display: flex">
                                <div class="label" style="flex: 0 0 auto">
                                    单号：
                                </div>
                                <div
                                    class="content"
                                    style="width: 100%; flex: 1 1 auto"
                                >
                                    {{ o.checkoutCode }}
                                </div>
                            </div>
                            <div class="col" style="width: 50%; display: flex">
                                <div class="label" style="flex: 0 0 auto">
                                    发货：
                                </div>
                                <div
                                    class="content"
                                    style="width: 100%; flex: 1 1 auto"
                                >
                                    {{ o.storehouseName }}
                                </div>
                            </div>
                        </div>
                        <div style="display: flex">
                            <div class="col" style="width: 50%; display: flex">
                                <div class="label" style="flex: 0 0 auto">
                                    工作站：
                                </div>
                                <div
                                    class="content"
                                    style="width: 100%; flex: 1 1 auto"
                                >
                                    <!-- {{ o.itemSkuCode }} -->
                                </div>
                            </div>
                            <div class="col" style="width: 50%; display: flex">
                                <div class="label" style="flex: 0 0 auto">
                                    序列号：
                                </div>
                                <div
                                    class="content"
                                    style="width: 100%; flex: 1 1 auto"
                                >
                                    <!-- {{ o.itemQty }} -->
                                </div>
                            </div>
                        </div>
                        <div
                            class="col"
                            style="
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            "
                        >
                            <bar-code
                                :id="`labelbarcode${idx}-${index}`"
                                :code="o.tagCode"
                                :codeWidth="2 * scale"
                                :codeHeight="70 * scale"
                                :displayValue="true"
                                :fontSize="32"
                            ></bar-code>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="jsx">
import TemplateMixin from "./mixin";
import BarCode from "../components/barcode.vue";

export default {
    components: {
        BarCode,
    },
    mixins: [TemplateMixin],
    props: {
        width: {
            type: String,
            default: "80mm",
        },
        height: {
            type: String,
            default: "40mm",
        },
        margin: {
            type: String,
            default: "2mm",
        },
        isSerial: {
            type: Boolean,
            default: true,
        },
        scale: {
            type: Number,
            default: 2,
        },
        isFull: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        series(LODOP, printerParams) {
            this.onPrintBefore(LODOP, printerParams);
            for (let i = 0; i < this.printDataPost.length; i++) {
                for(let j = 0; j < this.printDataPost[i].length; j++) {
                    this.onPrintEnter(LODOP, printerParams, `${i}-${j}`);
                }
                this.onPrintAfter(LODOP, printerParams);
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
