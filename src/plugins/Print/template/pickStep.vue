<template>
    <div>
        <div style="position: absolute">
            <Select v-model="previewIndex" style="width: 200px">
                <Option
                    v-for="(item, index) in allStepData"
                    :key="'select-' + index"
                    :value="index"
                    :label="item[0].pickCode"
                    >{{ item[0].pickCode }}</Option
                >
            </Select>
        </div>
        <div class="preview-vo">
            <div
                v-for="(o, index) in previewData"
                :key="index"
                :style="`width: ${previewWidth};min-height: ${previewHeight};position: relative;margin: 0 auto;border: 1px dashed #ccc;padding: ${margin};`"
            >
                <div style="font-size: 12px">
                    <div
                        class="otitle"
                        style="display: flex; align-items: center"
                    >
                        <div
                            style="
                                width: 30%;
                                flex-shrink: 0;
                                display: flex;
                                align-items: center;
                            "
                        >
                            <bar-code
                                :id="'jsbarcode' + index"
                                :code="o.pickCode"
                                :codeHeight="50"
                                :marginLeft="0"
                                :marginRight="0"
                                :displayValue="false"
                            ></bar-code>
                        </div>
                        <div
                            style="
                                font-size: 20px;
                                font-weight: bold;
                                text-align: center;
                                width: 100%;
                            "
                        >
                            商品拣货单
                        </div>
                        <div style="width: 30%; flex-shrink: 0"></div>
                    </div>
                    <div
                        class="ohead"
                        style="
                            display: flex;
                            justify-content: space-between;
                            flex-wrap: wrap;
                            align-items: center;
                        "
                    >
                        <div
                            class="ohead-item"
                            style="width: 30%; flex-shrink: 0"
                        >
                            拣货单号：{{ o.pickCode }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 20%; flex-shrink: 0"
                        >
                            单据类型：存储
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 20%; flex-shrink: 0"
                        >
                            仓库：{{ o.storehouseCode }}/{{ o.storehouseName }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 30%; flex-shrink: 0"
                        >
                            制单人：{{ o.crtUser }}
                        </div>

                        <div
                            class="ohead-item"
                            style="width: 30%; flex-shrink: 0"
                        >
                            订单号：{{ o.refSheetCode }}
                        </div>
                        <!-- <div class="ohead-item" style="width: 20%; flex-shrink: 0">
                                客户：{{ o.customer }}
                            </div> -->
                        <div
                            class="ohead-item"
                            style="width: 40%; flex-shrink: 0"
                        >
                            门店：{{ o.receiverName }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 30%; flex-shrink: 0"
                        >
                            打印时间：{{ getMoment(o.printDate) }}
                        </div>

                        <!-- <div class="ohead-item" style="width: 15%; flex-shrink: 0">
                                商品种类：{{ o.ttlSku }}
                            </div> -->
                        <div
                            class="ohead-item"
                            style="width: 15%; flex-shrink: 0"
                        >
                            商品总数：{{ o.total }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 20%; flex-shrink: 0"
                        >
                            类型：{{ o.orderType }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 20%; flex-shrink: 0"
                        >
                            暂存区：{{ o.storageShelfCode }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 30%; flex-shrink: 0"
                        >
                            配送线路：{{ o.pahseDcRoute }}
                        </div>
                    </div>
                </div>
                <div class="obody">
                    <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="5px"
                        border="0"
                        style="
                            text-align: left;
                            border-top: 1px solid #ccc;
                            font-size: 11px;
                        "
                    >
                        <colgroup>
                            <col width="6%" align="center" />
                            <col width="10%" />
                            <col width="14%" align="center" />
                            <col width="auto" />
                            <!-- <col width="auto" /> -->
                            <col width="18%" align="left" />
                            <col width="12%" align="center" />
                            <col width="15%" align="center" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: left;
                                    "
                                >
                                    行号
                                </th>
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: left;
                                    "
                                >
                                    生产日期
                                </th>
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: left;
                                    "
                                >
                                    拣货位
                                </th>
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: left;
                                    "
                                >
                                    商品名称
                                </th>
                                <!-- <th style="background-color: #eee">商品条码</th> -->
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: left;
                                    "
                                >
                                    单位/包装规格
                                </th>
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: center;
                                    "
                                >
                                    应拣数量
                                </th>
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: center;
                                    "
                                >
                                    实拣数量
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(x, y) in o.detailVos" :key="y">
                                <td
                                    style="
                                        border-bottom: 1px solid #eee;
                                        text-align: left;
                                    "
                                >
                                    {{ x.serialNum }}
                                </td>
                                <td
                                    style="
                                        border-bottom: 1px solid #eee;
                                        text-align: left;
                                    "
                                >
                                    <!-- <div>{{ x.batchCode }}</div> -->
                                    {{ x.productionDate }}
                                </td>
                                <td
                                    style="
                                        border-bottom: 1px solid #eee;
                                        text-align: left;
                                    "
                                >
                                    {{ x.arrangeShelfCode }}
                                </td>
                                <td
                                    style="
                                        border-bottom: 1px solid #eee;
                                        text-align: left;
                                    "
                                >
                                    <!-- <div>{{ x.commCode }}</div> -->
                                    <div>{{ x.commName }}</div>
                                </td>
                                <!-- <td style="border-bottom: 1px solid #eee">
                                        <bar-code
                                            :id="'jsbarcode' + index + '-' + y + '-1'"
                                            :code="x.commUpc"
                                            :codeHeight="40"
                                            :marginLeft="0"
                                            :marginRight="0"
                                            :displayValue="false"
                                        ></bar-code>
                                    </td> -->
                                <td style="border-bottom: 1px solid #eee">
                                    <div>{{ x.unit }}/{{ x.pikSpec }}</div>
                                    <!-- <div>{{ x.pikSpec }}</div> -->
                                </td>
                                <td
                                    style="
                                        border-bottom: 1px solid #eee;
                                        text-align: center;
                                    "
                                >
                                    {{ x.arrangeQty }}
                                </td>
                                <td
                                    style="
                                        border-bottom: 1px solid #eee;
                                        text-align: left;
                                    "
                                >
                                    <!-- {{ x.pickQty }} -->
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="5" style="text-align: left">
                                    合计：
                                </th>
                                <th>
                                    <span
                                        class="yv-print__hide"
                                        style="margin-left: 42%"
                                        >{{
                                            sum(
                                                o.detailVos.map(
                                                    (i) => i.arrangeQty || 0
                                                )
                                            )
                                        }}</span
                                    >
                                    <font
                                        class="yv-print__show inline"
                                        tdata="SubSum"
                                        format="#"
                                        tindex="6"
                                        >###</font
                                    >
                                </th>
                                <th></th>
                                <!-- <th style="text-align: center">
                                        <span class="yv-print__hide">{{
                                            sum(o.detailVos.map(i => i.pickQty || 0))
                                        }}</span>
                                        <font
                                            class="yv-print__show inline"
                                            tdata="SubSum"
                                            format="#"
                                            tindex="8"
                                            >###</font
                                        >
                                    </th> -->
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>
<script lang="jsx">
import TemplateMixin from "./mixin";
import BarCode from "../components/barcode.vue";
import { getLodop } from "../LodopFuncs";

export default {
    mixins: [TemplateMixin],
    components: {
        BarCode,
    },
    props: {
        width: {
            type: String,
            default() {
                return "210mm";
            },
        },
        height: {
            type: String,
            default() {
                return "297mm";
            },
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
                        this.$nextTick(() => {
                            this.series(
                                this.LODOP,
                                this.printerParams,
                                this.allStepData[n - 1],
                                n - 1
                            );
                        });
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
            this.allStepData.map((itemArr, index) => {
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
                    this.onPrintEnter(LODOP, printerParams, {
                        ...printData2[i][j],
                    });
                }
                LODOP.SET_PRINT_MODE(
                    "CUSTOM_TASK_NAME",
                    `${
                        printData2[i][0].code || printData2[i][0].pickCode
                    }拣货单:组 ${i}`
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
        onPrintTable(LODOP, printerParams, printData) {
            LODOP.NEWPAGEA();

            const o = printData;
            const headerHTML = `
                <div
                    style="font-size: 12px"
                >
                    <div
                        class="otitle"
                        style="display: flex; align-items: center"
                    >
                        <div
                            style="
                                width: 30%;
                                height: 50px;
                                flex-shrink: 0;
                                display: flex;
                                align-items: center;
                            "
                        >
                        </div>
                        <div
                            style="
                                font-size: 20px;
                                font-weight: bold;
                                text-align: center;
                                width: 100%;
                            "
                        >
                            商品拣货单
                        </div>
                        <div style="width: 30%; flex-shrink: 0"></div>
                    </div>
                    <div
                        class="ohead"
                        style="
                            display: flex;
                            justify-content: space-between;
                            flex-wrap: wrap;
                            align-items: center;
                        "
                    >
                        <div
                            class="ohead-item"
                            style="width: 30%; flex-shrink: 0"
                        >
                            拣货单号：${o.pickCode}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 20%; flex-shrink: 0"
                        >
                            单据类型：存储
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 20%; flex-shrink: 0"
                        >
                            仓库：${o.storehouseCode}/${o.storehouseName}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 30%; flex-shrink: 0"
                        >
                            制单人：${o.crtUser}
                        </div>

                        <div
                            class="ohead-item"
                            style="width: 30%; flex-shrink: 0"
                        >
                            订单号：${o.refSheetCode}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 40%; flex-shrink: 0"
                        >
                            门店：${o.receiverName}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 30%; flex-shrink: 0"
                        >
                            打印时间：${this.getMoment(o.printDate)}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 15%; flex-shrink: 0"
                        >
                            商品总数：${o.total}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 20%; flex-shrink: 0"
                        >
                            类型：${o.orderType}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 20%; flex-shrink: 0"
                        >
                            暂存区：${o.storageShelfCode}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 30%; flex-shrink: 0"
                        >
                            配送线路：${o.pahseDcRoute}
                        </div>
                    </div>
                </div>
            `;
            const bodyHTML = [
                `
                <div class="obody">
                    <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="5px"
                        border="0"
                        style="
                            text-align: left;
                            border-top: 1px solid #ccc;
                            font-size: 11px;
                        "
                    >
                        <colgroup>
                            <col width="6%" align="center" />
                            <col width="10%" />
                            <col width="14%" align="center" />
                            <col width="auto" />
                            <col width="18%" align="left" />
                            <col width="12%" align="center" />
                            <col width="15%" align="center" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: left;
                                    "
                                >
                                    行号
                                </th>
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: left;
                                    "
                                >
                                    生产日期
                                </th>
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: left;
                                    "
                                >
                                    拣货位
                                </th>
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: left;
                                    "
                                >
                                    商品名称
                                </th>
                                <!-- <th style="background-color: #eee">商品条码</th> -->
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: left;
                                    "
                                >
                                    单位/包装规格
                                </th>
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: center;
                                    "
                                >
                                    应拣数量
                                </th>
                                <th
                                    style="
                                        background-color: #eee;
                                        text-align: center;
                                    "
                                >
                                    实拣数量
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                `,
                ...o.detailVos.map((x, y) => {
                    return `
                        <tr>
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                    text-align: left;
                                "
                            >
                                ${x.serialNum}
                            </td>
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                    text-align: left;
                                "
                            >
                                ${x.productionDate}
                            </td>
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                    text-align: left;
                                "
                            >
                                ${x.arrangeShelfCode}
                            </td>
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                    text-align: left;
                                "
                            >
                                <div>${x.commName}</div>
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <div>${x.unit}/${x.pikSpec}</div>
                            </td>
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                    text-align: center;
                                "
                            >
                                ${x.arrangeQty}
                            </td>
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                    text-align: left;
                                "
                            >
                            </td>
                        </tr>
                    `;
                }),
                `
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="5" style="text-align: left">
                                    合计：
                                </th>
                                <th>
                                    <font
                                        tdata="SubSum"
                                        format="#"
                                        tindex="6"
                                        >###</font
                                    >
                                </th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            `,
            ].join("");

            this.eachLoopBefore(...arguments);
            LODOP.SET_PRINT_PAGESIZE(
                this.arrow,
                this.unit2mm(this.width),
                this.unit2mm(this.height),
                ""
            );

            LODOP.ADD_PRINT_HTM(...this.formatAddArgs(), headerHTML);
            LODOP.SET_PRINT_STYLEA(0, "ItemName", `head`);

            // LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
            LODOP.ADD_PRINT_TABLE(0, 0, this.formatAddArgs()[2], this.formatAddArgs()[3], bodyHTML);
            LODOP.SET_PRINT_STYLEA(0, "TableHeightScope", 1);
            LODOP.SET_PRINT_STYLEA(0, "Vorient", 0);
            LODOP.SET_PRINT_STYLEA(0, "LinkedItem", "head");

            LODOP.ADD_PRINT_BARCODEA(
                "条码",
                18,
                27,
                195,
                47,
                "128Auto",
                o.pickCode
            );
            LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0);
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
