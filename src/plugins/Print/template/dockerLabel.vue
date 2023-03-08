<template>
    <div>
        <div
            v-for="(o, index) in printDataPost"
            :key="index"
            :style="`width: ${previewWidth};height: ${previewHeight};position: relative;margin: 10px auto;border: 1px dashed #ccc;padding: ${
                marginBoxScale.t
            } ${marginBoxScale.r} ${marginBoxScale.b} ${
                marginBoxScale.l
            };zoom: ${1 / scale}`"
        >
            <div
                :id="'print-page' + index"
                :style="`width: ${contentPreviewWidth};height: ${contentPreviewHeight};${
                    hasBorder && 'border:' + border + ';'
                } ;overflow: hidden;box-sizing: border-box;font-size: 16px;display: flex;align-items: center;`"
            >
                <div style="width: 100%; height: 100%; overflow: hidden">
                    <div class="col" style="display: flex">
                        <div class="label" style="flex: 0 0 auto"></div>
                        <div
                            class="content"
                            style="
                                flex: 1 1 auto;
                                text-align: center;
                                font-size: 24px;
                                font-weight: bold;
                                color: #000;
                            "
                        >
                            {{ o.containerValueName }}标签
                        </div>
                    </div>
                    <div class="col" style="display: flex">
                        <div class="label" style="flex: 0 0 auto"></div>
                        <div
                            class="content"
                            style="flex: 1 1 auto; text-align: center"
                        >
                            <bar-code
                                :id="'labelbarcode' + index"
                                :code="o.containerCode"
                                :codeWidth="2"
                                :codeHeight="60"
                                :marginLeft="0"
                                :marginRight="0"
                                :displayValue="false"
                            ></bar-code>
                        </div>
                    </div>
                    <div style="text-align: center">
                        编码：{{ o.containerCode }}
                    </div>
                </div>
            </div>
        </div>
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
        isFull: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style scoped>
.yv-print__show {
    display: none;
}
</style>
