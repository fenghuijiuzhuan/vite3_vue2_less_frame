<template>
    <div>
        <div style="position: absolute">
            <Select v-model="previewIndex" style="width: 200px">
                <Option
                    v-for="(item, index) in allStepData"
                    :key="'select-' + index"
                    :value="index"
                    :label="item[0].code"
                    >{{ item[0].code }}</Option
                >
            </Select>
        </div>
        <div class="preview-vo">
            <div
                v-for="(o, index) in previewData"
                :key="index"
                :style="`width: ${previewWidth};height: ${previewHeight};position: relative;margin: 10px auto; border: 1px dashed #ccc;padding: ${
                    marginBoxScale.t
                } ${marginBoxScale.r} ${marginBoxScale.b} ${
                    marginBoxScale.l
                };zoom: ${1 / scale}`"
            >
                <div
                    :style="`width: ${contentPreviewWidth};height: ${contentPreviewHeight}; ${
                        hasBorder && 'border:' + border + ';'
                    } ;box-sizing: border-box;font-size: 22px;color: #000;line-height: 1.1; display: flex; align-items: center`"
                >
                    <template v-if="o.html">
                        <div
                            :style="`width: 156mm; height: 76mm;`"
                            v-html="o.html"
                        ></div>
                    </template>
                    <template v-else>
                        <div :style="`width: 156mm; height: 76mm`">
                            <div style="display: flex">
                                <div
                                    class="col"
                                    style="
                                        width: 60%;
                                        display: flex;
                                        align-items: center;
                                    "
                                >
                                    <div class="label" style="flex: 0 0 auto">
                                        收货：
                                    </div>
                                    <div
                                        class="content"
                                        style="
                                            width: 100%;
                                            flex: 1 1 auto;
                                            font-size: 26px;
                                            font-weight: bold;
                                            white-space: nowrap;
                                        "
                                    >
                                        {{ o.receiverName }}
                                    </div>
                                </div>
                                <div
                                    class="col"
                                    style="width: 40%; display: flex"
                                >
                                    <div
                                        class="label"
                                        style="flex: 0 0 auto"
                                    ></div>
                                    <div
                                        class="content"
                                        style="
                                            width: 100%;
                                            flex: 1 1 auto;
                                            font-size: 32px;
                                            text-align: right;
                                        "
                                    >
                                        行号：{{ o.serialNum }}
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex">
                                <div
                                    class="col"
                                    style="width: 50%; display: flex"
                                >
                                    <div class="label" style="flex: 0 0 auto">
                                        单号：
                                    </div>
                                    <div
                                        class="content"
                                        style="width: 100%; flex: 1 1 auto"
                                    >
                                        {{ o.pickCode }}
                                    </div>
                                </div>
                                <div
                                    class="col"
                                    style="width: 50%; display: flex"
                                >
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
                            <div
                                class="col"
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                "
                            >
                                <div
                                    class="col"
                                    style="flex: 1 1 auto; overflow: hidden"
                                >
                                    <div
                                        class="col"
                                        style="
                                            display: flex;
                                            align-items: center;
                                            height: 48px;
                                            line-height: 24px;
                                        "
                                    >
                                        <div
                                            class="label"
                                            style="flex: 0 0 auto"
                                        >
                                            商品：
                                        </div>
                                        <div
                                            class="content"
                                            style="
                                                width: 100%;
                                                flex: 1 1 auto;
                                                font-size: 24px;
                                                font-weight: bold;
                                            "
                                        >
                                            {{ o.commName }}
                                        </div>
                                    </div>
                                    <div style="display: flex">
                                        <div class="col" style="display: flex">
                                            <div
                                                class="label"
                                                style="flex: 0 0 auto"
                                            >
                                                编码：
                                            </div>
                                            <div
                                                class="content"
                                                style="
                                                    width: 100%;
                                                    flex: 1 1 auto;
                                                "
                                            >
                                                {{ o.commCode }}
                                            </div>
                                        </div>
                                        <div class="col" style="display: flex">
                                            <div
                                                class="label"
                                                style="flex: 0 0 auto"
                                            >
                                                拣货位：
                                            </div>
                                            <div
                                                class="content"
                                                style="
                                                    width: 100%;
                                                    flex: 1 1 auto;
                                                    font-size: 32px;
                                                "
                                            >
                                                {{ o.pickShelfCode }}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col"
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            width: 100%;
                                        "
                                    >
                                        <bar-code
                                            :id="`preview-labelbarcode${index}`"
                                            :code="o.tagCode"
                                            :codeWidth="1.6 * scale"
                                            :codeHeight="40 * scale"
                                            :displayValue="true"
                                            :fontSize="32"
                                            :marginLeft="10"
                                        ></bar-code>
                                    </div>
                                </div>
                                <qr-code
                                    style="
                                        flex: 0 0 auto;
                                        align-self: flex-start;
                                    "
                                    :text="o.dateOtherGoodsCode"
                                    :size="80 * scale"
                                />
                            </div>
                            <div style="display: flex">
                                <div
                                    class="col"
                                    style="
                                        width: 50%;
                                        display: flex;
                                        flex: 1 1 auto;
                                    "
                                >
                                    <div class="label" style="flex: 0 0 auto">
                                        生产日期：
                                    </div>
                                    <div
                                        class="content"
                                        style="width: 100%; flex: 1 1 auto"
                                    >
                                        {{ o.productDate }}
                                    </div>
                                </div>
                                <div
                                    class="col"
                                    style="display: flex; margin-right: 10px"
                                >
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
                                <div
                                    class="col"
                                    style="display: flex; flex: 0 0 auto"
                                >
                                    <div class="label" style="flex: 0 0 auto">
                                        数量：
                                    </div>
                                    <div
                                        class="content"
                                        style="width: 100%; flex: 1 1 auto"
                                    >
                                        {{ o.seqIndex }}/{{ o.arrangeQty }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="jsx">
import TemplateMixin from "./mixin";
import BarCode from "../components/barcode.vue";
import QrCode from "../components/qrcode.vue";
import { getLodop } from "../LodopFuncs";

export default {
    components: {
        BarCode,
        QrCode,
    },
    mixins: [TemplateMixin],
    props: {
        width: {
            type: String,
            default() {
                return "80mm";
            },
        },
        height: {
            type: String,
            default() {
                return "40mm";
            },
        },
        margin: {
            type: String,
            default: "1mm",
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
        isCustom: {
            type: Boolean,
            default: true,
        },
        stepIndex: {
            type: Number,
            default: null,
        },
        stepLen: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            allStepData: [],
            previewIndex: 0,
            printerParams: {},
            isStartPrint: false,
            LODOP: null,
        };
    },
    computed: {
        printDataPost() {
            return this.printData;
        },
        previewData() {
            return this.allStepData[this.previewIndex];
        },
    },
    watch: {
        stepIndex: {
            handler(n, o) {
                if (n) {
                    // this.allStepData[n - 1] = [...this.printDataPost];
                    this.allStepData.push([...this.printDataPost]);
                    if (this.isStartPrint) {
                        this.series(
                            this.LODOP,
                            this.printerParams,
                            this.allStepData[n - 1]
                        );
                        if (this.stepLen === n) {
                            this.isStartPrint = false;
                        }
                    }
                }
            },
            immediate: true,
        },
    },
    methods: {
        onOk(printerParams = {}) {
            this.printerParams = printerParams;
            let LODOP = getLodop();
            this.LODOP = LODOP;
            this.isStartPrint = true;
            this.onPrint(LODOP, printerParams);
        },
        onPrint(LODOP, printerParams) {
            Object.values(this.allStepData).map((itemArr) => {
                this.series(LODOP, printerParams, itemArr);
            });
        },
        series(LODOP, printerParams, customPrintData) {
            const oneCount = 10;
            let data = customPrintData;
            const printData2 = this.isGroup
                ? this.arrayOneToTwo(data, oneCount)
                : [data];
            this.onPrintBefore(LODOP, printerParams);
            for (let i = 0; i < printData2.length; i++) {
                for (let j = 0; j < printData2[i].length; j++) {
                    this.onPrintEnter(LODOP, printerParams, printData2[i][j]);
                }
                LODOP.SET_PRINT_MODE(
                    "CUSTOM_TASK_NAME",
                    `${
                        printData2[i][0].code || printData2[i][0].pickCode
                    }拣货标签:组 ${i}`
                );
                this.onPrintAfter(LODOP, printerParams);
            }
        },
        onPrintEnter(LODOP, printerParams, customPrintData) {
            if (this.isSerial) {
                return this.onPrintDefault(...arguments);
            }
            return this.onPrintTable(...arguments);
        },
        onPrintDefault(LODOP, printerParams, printData) {
            LODOP.NEWPAGEA();

            const { contentWidth, contentHeight, hasBorder, border } = this;
            const o = printData;
            const fontsize = 11;
            const defaultContent = `
                    <div style="display: flex">
                        <div
                            class="col"
                            style="width: 60%; display: flex; align-items: center"
                        >
                            <div class="label" style="flex: 0 0 auto;font-size: ${fontsize}px">
                                收货：
                            </div>
                            <div
                                class="content"
                                style="
                                    width: 100%;
                                    flex: 1 1 auto;
                                    font-size: 11px;
                                    font-weight: bold;
                                    white-space: nowrap;
                                "
                            >
                                ${o.receiverName}
                            </div>
                        </div>
                        <div class="col" style="width: 40%; display: flex">
                            <div class="label" style="flex: 0 0 auto"></div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto;font-size: 14px;text-align: right;"
                            >
                                行号：${o.serialNum}
                            </div>
                        </div>
                    </div>
                    <div style="display: flex">
                        <div class="col" style="width: 50%; display: flex">
                            <div class="label" style="flex: 0 0 auto;font-size: ${fontsize}px">
                                单号：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto;font-size: ${fontsize}px"
                            >
                                ${o.pickCode}
                            </div>
                        </div>
                        <div class="col" style="width: 50%; display: flex">
                            <div class="label" style="flex: 0 0 auto;font-size: ${fontsize}px">
                                发货：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto;font-size: ${fontsize}px"
                            >
                                ${o.storehouseName}
                            </div>
                        </div>
                    </div>
                    <div
                        class="col"
                        style="display: flex;justify-content: space-between"
                    >
                        <div class="col" style="flex: 1 1 auto; overflow:hidden">
                            <div
                                class="col"
                                style="display: flex; align-items: center; height: 24px;line-height: 12px"
                            >
                                <div class="label" style="flex: 0 0 auto;font-size: ${fontsize}px">
                                    商品：
                                </div>
                                <div
                                    class="content"
                                    style="
                                width: 100%;
                                flex: 1 1 auto;
                                font-size: 13px;
                                font-weight: bold;
                            "
                                >
                                    ${o.commName}
                                </div>
                            </div>
                            <div style="display: flex">
                                <div class="col" style="display: flex">
                                    <div class="label" style="flex: 0 0 auto;font-size: ${fontsize}px">
                                        编码：
                                    </div>
                                    <div
                                        class="content"
                                        style="width: 100%; flex: 1 1 auto;font-size: ${fontsize}px"
                                    >
                                        ${o.commCode}
                                    </div>
                                </div>
                                <div class="col" style="display: flex">
                                    <div class="label" style="flex: 0 0 auto;font-size: ${fontsize}px">
                                        拣货位：
                                    </div>
                                    <div
                                        class="content"
                                        style="width: 100%; flex: 1 1 auto;font-size: 14px;"
                                    >
                                        ${o.pickShelfCode}
                                    </div>
                                </div>
                            </div>
                            <div
                                class="col"
                                style="
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    width: 100%;
                                    height: 50px;
                                    visibility: hidden;
                                "
                            ></div>
                        </div>
                        <div
                            style="
                                flex: 0 0 auto;
                                align-self: flex-start;
                                width: 80px;
                                height: 80px;
                                visibility: hidden;
                            "
                        ></div>
                    </div>
                    <div style="display: flex">
                        <div
                            class="col"
                            style="width: 50%; display: flex; flex: 1 1 auto"
                        >
                            <div class="label" style="flex: 0 0 auto;font-size: ${fontsize}px">
                                生产日期：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto;font-size: ${fontsize}px"
                            >
                                ${o.productDate}
                            </div>
                        </div>
                        <div
                            class="col"
                            style="display: flex;margin-right: 10px"
                        >
                            <div class="label" style="flex: 0 0 auto;font-size: ${fontsize}px">
                                单位：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto;font-size: ${fontsize}px"
                            >
                                ${o.unit}
                            </div>
                        </div>
                        <div class="col" style="display: flex;flex: 0 0 auto;">
                            <div class="label" style="flex: 0 0 auto;font-size: ${fontsize}px">
                                数量：
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto;font-size: ${fontsize}px"
                            >
                                ${o.seqIndex}/${o.arrangeQty}
                            </div>
                        </div>
                    </div>
            `;
            const wrapHtml = `<div
                :style="
                    width: ${contentWidth};height: ${contentHeight}; ${
                hasBorder && "border:" + border + ";"
            } ;box-sizing: border-box;font-size: 9px;color: #000;line-height: 1.1; display: flex; align-items: center
                "
            >
                <div :style="width: 78mm; height: 38mm;">
                    ${o.html ? o.html : defaultContent}
                </div>
            </div>`;

            this.eachLoopBefore(...arguments);
            LODOP.SET_PRINT_PAGESIZE(
                this.arrow,
                this.unit2mm(this.width),
                this.unit2mm(this.height),
                ""
            );
            LODOP.ADD_PRINT_HTM(...this.formatAddArgs(), wrapHtml);
            LODOP.ADD_PRINT_BARCODEA(
                "条码",
                74,
                12,
                195,
                47,
                "128Auto",
                o.tagCode
            );
            LODOP.SET_PRINT_STYLEA(0, "Horient", 3);
            LODOP.ADD_PRINT_BARCODE(
                40,
                208,
                94,
                85,
                "QRCode",
                o.dateOtherGoodsCode
            );
            LODOP.SET_PRINT_STYLEA(0, "Horient", 3);

            this.eachLoopAfter(...arguments);
        },
    },
};
</script>

<style scoped>
.yv-print__show {
    display: none;
}
</style>
