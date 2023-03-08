<template>
    <div>
        <div
            v-for="(o, index) in printDataPost"
            :key="index"
            :style="`width: ${previewWidth};height: ${previewHeight};position: relative;margin: 0 auto;border: 1px dashed #ccc;padding: ${
                marginBoxScale.t
            } ${marginBoxScale.r} ${marginBoxScale.b} ${
                marginBoxScale.l
            };zoom: ${1 / scale}`"
        >
            <div style="position: relative; z-index: 2">
                <div :id="'print-head' + index">
                    <div
                        class="otitle"
                        style="display: flex; margin-bottom: 10px"
                    >
                        <div
                            style="
                                font-size: 20px;
                                font-weight: bold;
                                text-align: center;
                                width: 100%;
                            "
                        >
                            零食有鸣收货回执单
                        </div>
                        <span
                            style="
                                width: 33%;
                                flex-shrink: 0;
                                align-self: flex-end;
                            "
                            >订单编号：{{ o.checkinCode }}</span
                        >
                    </div>
                    <div
                        class="ohead"
                        style="
                            display: flex;
                            justify-content: space-between;
                            flex-wrap: wrap;
                        "
                    >
                        <div
                            class="ohead-item"
                            style="width: 66%; flex-shrink: 0"
                        >
                            供应商：{{ o.deliverName }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            页码：<span class="yv-print__hide">1/1</span>
                            <span class="yv-print__show inline">
                                <font tdata="PageNO" color="black">##</font>/
                                <font tdata="PageCount" color="black">##</font>
                            </span>
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            仓库：{{ o.storehouseName }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            收货时间：{{ o.crtDate }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            次数：打印{{ o.printCount || "1" }}次
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            备注：{{ o.checkinRemark }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            打印时间：{{ getMoment(o.printTime) }}
                        </div>
                    </div>
                </div>
                <div style="height: 20px"></div>
                <div class="obody" :id="'print-table' + index">
                    <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="5px"
                        border="0"
                        style="text-align: left; font-size: 10px"
                    >
                        <colgroup>
                            <col align="center" width="5%" />
                            <col width="12%" />
                            <col width="15%" />
                            <col width="5%" />
                            <col width="10%" />
                            <col width="8%" />
                            <col width="8%" />
                            <col width="8%" />
                            <col width="8%" />
                            <col width="8%" />
                            <col width="8%" />
                            <col width="8%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th
                                    style="
                                        border-top: 1px solid #ccc;
                                        border-left: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    序号
                                </th>
                                <th
                                    style="
                                        border-top: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    商品条码
                                </th>
                                <th
                                    style="
                                        border-top: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    商品名称
                                </th>
                                <th
                                    style="
                                        border-top: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    单位
                                </th>
                                <th
                                    style="
                                        border-top: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    生产日期
                                </th>
                                <th
                                    style="
                                        border-top: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    预约总数量
                                </th>
                                <th
                                    style="
                                        border-top: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    实收总数量
                                </th>
                                <th
                                    style="
                                        border-top: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    实收数量
                                </th>
                                <th
                                    style="
                                        border-top: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    赠送数量
                                </th>
                                <th
                                    style="
                                        border-top: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    计价比率
                                </th>
                                <th
                                    style="
                                        border-top: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    计价数量
                                </th>
                                <th
                                    style="
                                        border-top: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    备注
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(x, y) in o.detailList || []" :key="y">
                                <td
                                    style="
                                        border-left: 1px solid #ccc;
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ y + 1 }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.commUpc }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.commName }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.commMainUnit }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.productionDate }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.requireTtlDetailQty }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.checkinTtlDetailQty }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.checkinQty }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.checkinPresentQty }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.inspectRate }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.valuationQty }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.checkinDetailRemark }}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="9" rowspan="2"></th>
                                <th colspan="2" style="text-align: right">
                                    本页数量
                                </th>
                                <th style="text-align: right">
                                    <span class="yv-print__hide">{{
                                        sum(
                                            o.detailList.map(
                                                (_item) =>
                                                    _item.checkinTtlDetailQty
                                            )
                                        )
                                    }}</span>
                                    <font
                                        class="yv-print__show inline"
                                        tdata="SubCount"
                                        format="0"
                                        tindex="7"
                                        >###</font
                                    >
                                </th>
                            </tr>
                            <tr>
                                <th colspan="2" style="text-align: right">
                                    总计数量
                                </th>
                                <th style="text-align: right">
                                    <span class="yv-print__hide">{{
                                        sum(
                                            o.detailList.map(
                                                (_item) =>
                                                    _item.checkinTtlDetailQty
                                            )
                                        )
                                    }}</span>
                                    <font
                                        class="yv-print__show inline"
                                        tdata="AllCount"
                                        format="0"
                                        tindex="7"
                                        >###</font
                                    >
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div :id="'print-foot' + index">
                    <div class="ofoot" style="padding-top: 20px; display: flex">
                        <div
                            class="col"
                            style="
                                display: flex;
                                padding: 0 10px;
                                margin-right: 10px;
                            "
                        >
                            <div class="label" style="flex: 0 0 auto">
                                收货员签字：
                            </div>
                            <div
                                class="content"
                                style="flex: 1 1 auto; max-width: 150px"
                            >
                                {{ o.preparedName }}
                            </div>
                        </div>
                        <div
                            class="col"
                            style="
                                display: flex;
                                padding: 0 10px;
                                margin-right: 10px;
                            "
                        >
                            <div class="label" style="flex: 0 0 auto">
                                司机签字：
                            </div>
                            <div
                                class="content"
                                style="flex: 1 1 auto; max-width: 150px"
                            >
                                {{ o.checkName }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                :id="`print-floatimg${index}`"
                class="print-floatimg"
                style="
                    position: absolute;
                    right: 50px;
                    bottom: 50px;
                    width: 200px;
                    height: 200px;
                    z-index: 1;
                "
            >
                <img :src="receiveIMG" alt="" transcolor="#FFFFFF" />
            </div>
        </div>
    </div>
</template>
<script lang="jsx">
import TemplateMixin from "./mixin";
import receiveIMG from "../img-file/receive.png";

export default {
    mixins: [TemplateMixin],
    props: {
        width: {
            type: String,
            default() {
                // return "241mm";
                return "210mm";
            }
        },
        height: {
            type: String,
            default() {
                // return "139.5mm";
                return "297mm";
            }
        },
        bodyOffsetTop: {
            type: Number,
            default: 20
        },
    },
    data() {
        return {
            receiveIMG,
        };
    },
    methods: {
        eachLoopBefore(LODOP, printerParams, i) {
            const imgHTML = this.getElementById("print-floatimg" + i);
            LODOP.ADD_PRINT_IMAGE("70%", "70%", 200, 200, imgHTML.innerHTML);
            LODOP.SET_PRINT_STYLEA(0, "HtmWaitMilSecs", 100); //延迟100毫秒
            LODOP.SET_PRINT_STYLEA(0, "Stretch", 2);
            LODOP.SET_PRINT_STYLEA(0, "PageIndex", "last");
        },
    },
};
</script>

<style scoped>
.yv-print__show {
    display: none;
}
.print-floatimg img {
    width: 100%;
    height: 100%;
}
</style>
