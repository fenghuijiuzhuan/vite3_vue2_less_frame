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
                } ;box-sizing: border-box;font-size: 24px;color: #000;line-height: 1.1; display: flex; align-items: center`"
            >
                <div style="width: 100%">
                    <div class="col" style="display: flex; align-items: center">
                        <div class="label" style="flex: 0 0 auto">品名：</div>
                        <div
                            class="content"
                            style="
                                width: 100%;
                                flex: 1 1 auto;
                                white-space: no-wrap;
                                font-weight: bold;
                                font-size: 26px;
                            "
                        >
                            {{ o.commName }}
                        </div>
                    </div>
                    <div class="col" style="display: flex; margin-top: 5px">
                        <div class="label" style="flex: 0 0 auto">编码：</div>
                        <div
                            class="content"
                            style="width: 100%; flex: 1 1 auto"
                        >
                            {{ o.commCode }}
                        </div>
                    </div>
                    <div style="display: flex; margin-top: 5px">
                        <div class="col" style="width: 50%; display: flex">
                            <div class="label" style="flex: 0 0 auto">
                                规格：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.pikSpec }}
                            </div>
                        </div>
                        <div class="col" style="width: 50%; display: flex">
                            <div class="label" style="flex: 0 0 auto">
                                单位：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.unit }}
                            </div>
                        </div>
                    </div>
                    <div
                        class="col"
                        style="
                            display: flex;
                            margin-top: 5px;
                            justify-content: center;
                        "
                    >
                        <bar-code
                            :id="'labelbarcode' + index"
                            :code="o.commUpc"
                            :codeWidth="2 * scale"
                            :codeHeight="60 * scale"
                            :displayValue="false"
                            format="EAN13"
                        ></bar-code>
                    </div>
                    <div class="col" style="display: flex; margin-top: 5px">
                        <!-- <div class="label" style="flex: 0 0 auto">条码：</div> -->
                        <div
                            class="content"
                            style="
                                width: 100%;
                                flex: 1 1 auto;
                                text-align: center;
                            "
                        >
                            {{ o.commUpc }}
                        </div>
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
        scale: {
            type: Number,
            default: 2,
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
