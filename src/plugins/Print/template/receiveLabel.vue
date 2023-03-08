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
                    <div class="col" style="display: flex">
                        <div class="label" style="flex: 0 0 auto">
                            商品名称：
                        </div>
                        <div
                            class="content"
                            style="
                                width: 100%;
                                flex: 1 1 auto;
                                word-break: break-all;
                                font-weight: bold;
                                font-size: 32px;
                            "
                        >
                            {{ o.commName }}
                        </div>
                    </div>
                    <div style="display: flex; margin-top: 5px">
                        <div class="col" style="width: 50%; display: flex">
                            <div class="label" style="flex: 0 0 auto">
                                商品编码：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.commCode }}
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
                    <div class="col" style="display: flex; margin-top: 5px">
                        <div class="label" style="flex: 0 0 auto">规格：</div>
                        <div
                            class="content"
                            style="width: 100%; flex: 1 1 auto"
                        >
                            {{ o.pikSpec }}
                        </div>
                    </div>
                    <div style="display: flex; margin-top: 5px">
                        <div class="col" style="width: 50%; display: flex">
                            <div class="label" style="flex: 0 0 auto">
                                码盘规则：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.palletRule }}
                            </div>
                        </div>
                        <div class="col" style="width: 50%; display: flex">
                            <div class="label" style="flex: 0 0 auto">
                                数量：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.palletQty }}
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; margin-top: 5px">
                        <div class="col" style="width: 50%; display: flex">
                            <div class="label" style="flex: 0 0 auto">
                                生产日期：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.productionDate }}
                            </div>
                        </div>
                        <div class="col" style="width: 50%; display: flex">
                            <div class="label" style="flex: 0 0 auto">
                                收货日期：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.receiveDate }}
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; margin-top: 5px">
                        <div class="col" style="width: 50%; display: flex">
                            <div class="label" style="flex: 0 0 auto">
                                保质期：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.qaDays }}
                            </div>
                        </div>
                        <div class="col" style="width: 50%; display: flex">
                            <div class="label" style="flex: 0 0 auto">
                                预警日期：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.warningDate }}
                            </div>
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
            default: "70mm",
        },
        height: {
            type: String,
            default: "50mm",
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
    },
};
</script>

<style scoped>
.yv-print__show {
    display: none;
}
</style>
