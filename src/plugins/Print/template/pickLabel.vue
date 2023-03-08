<template>
    <div>
        <div
            v-for="(o, index) in printDataPost"
            :key="index"
            :style="
                `width: ${previewWidth};height: ${previewHeight};position: relative;margin: 10px auto;border: 1px dashed #ccc;padding: ${
                    marginBoxScale.t
                } ${marginBoxScale.r} ${marginBoxScale.b} ${
                    marginBoxScale.l
                };zoom: ${1 / scale}`
            "
        >
            <div
                :id="`print-page${index}`"
                :style="
                    `width: ${contentPreviewWidth};height: ${contentPreviewHeight}; ${hasBorder &&
                        'border:' +
                            border +
                            ';'} ;box-sizing: border-box;font-size: 22px;color: #000;line-height: 1.1; display: flex; align-items: center`
                "
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
                            <div class="col" style="width: 40%; display: flex">
                                <div class="label" style="flex: 0 0 auto"></div>
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
                            <div class="col" style="width: 50%; display: flex">
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
                        <div
                            class="col"
                            style="display: flex; justify-content: space-between"
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
                                    <div class="label" style="flex: 0 0 auto">
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
                                            style="width: 100%; flex: 1 1 auto"
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
                                        :id="`labelbarcode${index}`"
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
                                style="flex: 0 0 auto; align-self: flex-start"
                                :text="o.dateOtherGoodsCode"
                                :size="80 * scale"
                            />
                        </div>
                        <div style="display: flex">
                            <div
                                class="col"
                                style="width: 50%; display: flex; flex: 1 1 auto"
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
</template>

<script lang="jsx">
import TemplateMixin from "./mixin";
import BarCode from "../components/barcode.vue";
import QrCode from "../components/qrcode.vue";

export default {
    components: {
        BarCode,
        QrCode
    },
    mixins: [TemplateMixin],
    props: {
        width: {
            type: String,
            default() {
                return "80mm";
            }
        },
        height: {
            type: String,
            default() {
                return "40mm";
            }
        },
        margin: {
            type: String,
            default: "1mm"
        },
        isSerial: {
            type: Boolean,
            default: true
        },
        scale: {
            type: Number,
            default: 2
        },
        isFull: {
            type: Boolean,
            default: true
        },
        isCustom: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onPrintDefault(LODOP, printerParams, i) {
            const data = this.printDataPost[i];
            LODOP.NEWPAGEA();

            const { contentWidth, contentHeight, hasBorder, border } = this;
            const o = data;
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
                    width: ${contentWidth};height: ${contentHeight}; ${hasBorder &&
                "border:" +
                    border +
                    ";"} ;box-sizing: border-box;font-size: 9px;color: #000;line-height: 1.1; display: flex; align-items: center
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
        }
    }
    //     onPrintDefault(LODOP, printerParams, i) {
    //         const data = this.printDataPost[i]
    //         LODOP.NEWPAGEA();

    //         LODOP.ADD_PRINT_TEXTA("收货方label",48,6,100,31,"收货：");
    //         LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
    //         LODOP.ADD_PRINT_TEXTA("收货方value",42,51,531,32,"新加文本2少时诵诗书所少时诵诗书所是少时诵诗书所啥啥啥");
    //         LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
    //         LODOP.SET_PRINT_STYLEA(0,"Bold",1);
    //         LODOP.SET_PRINT_STYLEA(0,"Horient",3);
    //         LODOP.ADD_PRINT_TEXTA("行号label-value",48,601,190,36,"行号：1");
    //         LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
    //         LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
    //         LODOP.SET_PRINT_STYLEA(0,"Horient",3);
    //         LODOP.ADD_PRINT_TEXTA("单号label-value-发货仓label",84,6,299,25,"单号：111111111111111111  发货：");
    //         LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
    //         LODOP.ADD_PRINT_TEXTA("发货仓value",84,254,100,25,"道滘仓");
    //         LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
    //         LODOP.ADD_PRINT_TEXTA("商品label",119,6,100,25,"商品：");
    //         LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
    //         LODOP.ADD_PRINT_TEXTA("商品value",118,54,529,30,"商品商品商品商品商品商品商品商品商品商品商品商品");
    //         LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    //         LODOP.SET_PRINT_STYLEA(0,"Bold",1);
    //         LODOP.SET_PRINT_STYLEA(0,"Horient",3);
    //         LODOP.ADD_PRINT_TEXTA("编码label-拣货位label",153,7,231,25,"编码：11111111  拣货位：");
    //         LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
    //         LODOP.ADD_PRINT_TEXTA("拣货位",150,194,174,30,"新加文本13");
    //         LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
    //         LODOP.ADD_PRINT_BARCODEA("条码",190,18,562,60,"Code39","123456789012");
    //         LODOP.SET_PRINT_STYLEA(0,"Horient",3);
    //         LODOP.ADD_PRINT_TEXTA("生产日期label-value",255,5,410,30,"生产日期：111111");
    //         LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
    //         LODOP.ADD_PRINT_TEXTA("单位label-value-数量label-value",255,586,205,31,"单位：xx 数量：11");
    //         LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
    //         LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
    //         LODOP.SET_PRINT_STYLEA(0,"Horient",3);
    //         LODOP.ADD_PRINT_BARCODE(100,606,148,150,"QRCode","123456789012");
    //         LODOP.SET_PRINT_STYLEA(0,"Horient",3);

    //     },
    // }
};
</script>

<style scoped>
.yv-print__show {
    display: none;
}
</style>
