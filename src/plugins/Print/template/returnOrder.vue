<template>
    <div>
        <div
            v-for="(o, index) in printData"
            :key="index"
            :style="
                `width: ${previewWidth};height: ${previewHeight};position: relative;margin: 0 auto;border: 1px dashed #ccc;padding: ${
                    marginBoxScale.t
                } ${marginBoxScale.r} ${marginBoxScale.b} ${
                    marginBoxScale.l
                };zoom: ${1 / scale}`
            "
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
                        商品退货单
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
                        退货单号：{{ o.deliveryCode }}
                    </div>
                    <div class="ohead-item" style="width: 20%; flex-shrink: 0">
                        单据类型：存储
                    </div>
                    <div class="ohead-item" style="width: 20%; flex-shrink: 0">
                        仓库：{{ o.storehouseName }}
                    </div>
                    <div class="ohead-item" style="width: 30%; flex-shrink: 0">
                        制单人：{{ o.crtUser }}
                    </div>

                    <div class="ohead-item" style="width: 30%; flex-shrink: 0">
                        订单号：{{ o.orderCode }}
                    </div>
                    <div class="ohead-item" style="width: 20%; flex-shrink: 0">
                        <!-- 客户：{{ o.customer }} -->
                    </div>
                    <div class="ohead-item" style="width: 20%; flex-shrink: 0">
                        门店：{{ o.receiverName }}
                    </div>
                    <div class="ohead-item" style="width: 30%; flex-shrink: 0">
                        打印时间：{{ getMoment(o.printDate) }}
                    </div>

                    <div class="ohead-item" style="width: 15%; flex-shrink: 0">
                        商品种类：{{ o.ttlSku }}
                    </div>
                    <div class="ohead-item" style="width: 15%; flex-shrink: 0">
                        商品总数：{{ o.ttlQty }}
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
                        font-size: 10px;
                    "
                >
                    <colgroup>
                        <col width="5%" align="center" />
                        <col width="15%" />
                        <col width="8%" align="center" />
                        <col width="auto" />
                        <col width="auto" />
                        <col width="12%" align="center" />
                        <col width="12%" align="center" />
                        <col width="8%" align="center" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th style="background-color: #eee">序号</th>
                            <th style="background-color: #eee">批次号</th>
                            <th style="background-color: #eee">拣货位</th>
                            <th style="background-color: #eee">
                                商品编码/商品名称
                            </th>
                            <th style="background-color: #eee">商品条码</th>
                            <th style="background-color: #eee">
                                单位/包装规格
                            </th>
                            <th
                                style="background-color: #eee;text-align: center;"
                            >
                                应拣数量
                            </th>
                            <th style="background-color: #eee">实拣数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(x, y) in o.details" :key="y">
                            <td style="border-bottom: 1px solid #eee">
                                {{ y + 1 }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <div>{{ x.batchCode }}</div>
                                <div>生产日期：{{ x.productionDate }}</div>
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.arrangeShelfCode }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <div>{{ x.commCode }}</div>
                                <div>{{ x.commName }}</div>
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <bar-code
                                    :id="'jsbarcode' + index + '-' + y + '-1'"
                                    :code="x.commUpc"
                                    :codeHeight="40"
                                    :marginLeft="0"
                                    :marginRight="0"
                                    :displayValue="false"
                                ></bar-code>
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <div>{{ x.unit }}</div>
                                <div>{{ x.pikSpec }}</div>
                            </td>
                            <td
                                style="border-bottom: 1px solid #eee;text-align: center;"
                            >
                                {{ x.arrangeQty }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <!-- {{ x.pickQty }} -->
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="6" style="text-align: left">合计：</th>
                            <th style="text-align: center">
                                <span class="yv-print__hide">{{
                                    sum(o.details.map(i => i.arrangeQty || 0))
                                }}</span>
                                <font
                                    class="yv-print__show inline"
                                    tdata="SubSum"
                                    format="#"
                                    tindex="7"
                                    >###</font
                                >
                            </th>
                            <!-- <th style="text-align: center">
                                <span class="yv-print__hide">{{
                                    sum(o.details.map((i) => i.pickQty || 0))
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
        BarCode
    },
    props: {
        width: {
            type: String,
            default() {
                return "210mm";
            }
        },
        height: {
            type: String,
            default() {
                return "297mm";
            }
        }
    }
};
</script>

<style scoped>
.yv-print__show {
    display: none;
}
</style>
