<template>
    <div>
        <div
            v-for="(o, index) in printDataPost"
            :key="index"
            :style="`width: ${previewWidth};min-height: ${previewHeight};position: relative;margin: 0 auto;border: 1px dashed #ccc;padding: ${margin};`"
        >
            <div :id="'print-head' + index" style="font-size: 12px">
                <div class="otitle" style="display: flex; align-items: center">
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
                    <div class="ohead-item" style="width: 30%; flex-shrink: 0">
                        拣货单号：{{ o.pickCode }}
                    </div>
                    <div class="ohead-item" style="width: 20%; flex-shrink: 0">
                        单据类型：存储
                    </div>
                    <div class="ohead-item" style="width: 20%; flex-shrink: 0">
                        仓库：{{ o.storehouseCode }}/{{ o.storehouseName }}
                    </div>
                    <div class="ohead-item" style="width: 30%; flex-shrink: 0">
                        制单人：{{ o.crtUser }}
                    </div>

                    <div class="ohead-item" style="width: 30%; flex-shrink: 0">
                        订单号：{{ o.refSheetCode }}
                    </div>
                    <!-- <div class="ohead-item" style="width: 20%; flex-shrink: 0">
                            客户：{{ o.customer }}
                        </div> -->
                    <div class="ohead-item" style="width: 40%; flex-shrink: 0">
                        门店：{{ o.receiverName }}
                    </div>
                    <div class="ohead-item" style="width: 30%; flex-shrink: 0">
                        打印时间：{{ getMoment(o.printDate) }}
                    </div>

                    <!-- <div class="ohead-item" style="width: 15%; flex-shrink: 0">
                            商品种类：{{ o.ttlSku }}
                        </div> -->
                    <div class="ohead-item" style="width: 15%; flex-shrink: 0">
                        商品总数：{{ o.total }}
                    </div>
                    <div class="ohead-item" style="width: 20%; flex-shrink: 0">
                        类型：{{ o.orderType }}
                    </div>
                    <div class="ohead-item" style="width: 20%; flex-shrink: 0">
                        暂存区：{{ o.storageShelfCode }}
                    </div>
                    <div class="ohead-item" style="width: 30%; flex-shrink: 0">
                        配送线路：{{ o.pahseDcRoute }}
                    </div>
                </div>
            </div>
            <div class="obody" :id="'print-table' + index">
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
                                style="background-color: #eee; text-align: left"
                            >
                                行号
                            </th>
                            <th
                                style="background-color: #eee; text-align: left"
                            >
                                生产日期
                            </th>
                            <th
                                style="background-color: #eee; text-align: left"
                            >
                                拣货位
                            </th>
                            <th
                                style="background-color: #eee; text-align: left"
                            >
                                商品名称
                            </th>
                            <!-- <th style="background-color: #eee">商品条码</th> -->
                            <th
                                style="background-color: #eee; text-align: left"
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
                            <th colspan="5" style="text-align: left">合计：</th>
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
            <div :id="'print-foot' + index"></div>
        </div>
    </div>
</template>
<script lang="jsx">
import TemplateMixin from "./mixin";
import BarCode from "../components/barcode.vue";

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
    },
    computed: {},
};
</script>

<style scoped>
.yv-print__show {
    display: none;
}
</style>
