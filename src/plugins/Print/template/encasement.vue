<template>
    <div>
        <div
            v-for="(o, index) in printDataPost"
            :key="index"
            :style="`width: ${previewWidth};min-height: ${previewHeight};position: relative;margin: 0 auto;border: 1px dashed #ccc;padding: ${margin};`"
        >
            <div :id="'print-head' + index">
                <div
                    class="otitle"
                    style="
                        display: flex;
                        align-items: center;
                        border-bottom: 1px solid #ccc;
                    "
                >
                    <div
                        style="
                            width: 30%;
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;
                        "
                    >
                        <!-- <img
                            :src="o.logoUrl"
                            alt=""
                            style="width: 150px; height: 80px"
                        /> -->
                    </div>
                    <div
                        style="
                            font-size: 20px;
                            font-weight: bold;
                            text-align: center;
                            width: 100%;
                        "
                    >
                        装箱清单
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
                        font-size: 12px;
                    "
                >
                    <div
                        class="ohead-item"
                        style="width: 40%; margin: 5px 0; flex-shrink: 0"
                    >
                        订单号：{{ o.revelanceCode }}
                    </div>
                    <div
                        class="ohead-item"
                        style="width: 30%; margin: 5px 0; flex-shrink: 0"
                    >
                        下单时间：{{ o.orderTime }}
                    </div>
                    <div
                        class="ohead-item"
                        style="width: 30%; margin: 5px 0; flex-shrink: 0"
                    >
                        打印时间：{{ getMoment(o.dateTime) }}
                    </div>

                    <!-- <div
                        class="ohead-item"
                        style="width: 40%; margin: 5px 0; flex-shrink: 0"
                    >
                        客户名称：{{ o.customerName }}
                    </div> -->
                    <div
                        class="ohead-item"
                        style="width: 30%; margin: 5px 0; flex-shrink: 0"
                    >
                        门店名称：{{ o.shopName }}
                    </div>
                    <div
                        class="ohead-item"
                        style="width: 60%; margin: 5px 0; flex-shrink: 0"
                    >
                        联系电话：{{ o.phone }}
                    </div>

                    <div
                        class="ohead-item"
                        style="width: 100%; margin: 5px 0; flex-shrink: 0"
                    >
                        收货地址：{{ o.address }}
                    </div>
                    <!-- <div
                        class="ohead-item"
                        style="width: 100%; margin: 5px 0; flex-shrink: 0"
                    >
                        摘要：
                        {{ o.placeName }}
                    </div> -->
                </div>
            </div>
            <div class="obody" :id="'print-table' + index">
                <table
                    width="100%"
                    cellspacing="0"
                    cellpadding="5px"
                    border="0"
                    style="text-align: center; font-size: 12px"
                >
                    <colgroup>
                        <col width="5%" />
                        <col width="15%" align="left" />
                        <col width="auto" align="left" />
                        <col width="12%" align="left" />
                        <col width="6%" />
                        <col width="10%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th style="background-color: #eee">序号</th>
                            <th style="background-color: #eee">
                                商品编码/商品名称
                            </th>
                            <th style="background-color: #eee">商品条码</th>
                            <th style="background-color: #eee">规格</th>
                            <th style="background-color: #eee">单位</th>
                            <th style="background-color: #eee">装箱数量</th>
                            <th style="background-color: #eee"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(x, y) in o.commInfoList" :key="y">
                            <td style="border-bottom: 1px solid #eee">
                                {{ y + 1 }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <p style="margin: 10px 0">{{ x.commCode }}</p>
                                <p style="margin: 10px 0">{{ x.commName }}</p>
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <p style="line-height: 1">{{ x.upc }}</p>
                                <p style="">
                                    <bar-code
                                        :id="
                                            'jsbarcode' + index + '-' + y + '-1'
                                        "
                                        :code="x.upc"
                                        :codeHeight="40"
                                        :marginLeft="0"
                                        :marginRight="0"
                                        :displayValue="false"
                                    ></bar-code>
                                </p>
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.pikSpec }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.unit }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.packQty }}
                            </td>
                            <td style="border-bottom: 1px solid #eee"></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="7" style="text-align: right">
                                合计： 共
                                <font
                                    class="yv-print__show inline"
                                    tdata="SubSum"
                                    format="0"
                                    tindex="6"
                                    >###</font
                                >
                                <span class="yv-print__hide">{{
                                    sum(
                                        o.commInfoList.map(
                                            (i) => i.packQty || 0
                                        )
                                    )
                                }}</span>
                                件
                            </td>
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
};
</script>

<style scoped>
.yv-print__show {
    display: none;
}
</style>
