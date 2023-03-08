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
                <div style="width: 0; height: 0; overflow: hidden">
                    <div
                        :id="`print-head-unfirst${index}`"
                        style="height: 50px"
                    >
                        <div>发货单号：{{ o.deliveryCode }}</div>
                        <div style="position: absolute; top: 0; right: 0">
                            页码：<span class="yv-print__hide">1/1</span>
                            <span class="yv-print__show inline">
                                <font tdata="PageNO" color="black">##</font>/
                                <font tdata="PageCount" color="black">##</font>
                            </span>
                        </div>
                    </div>
                </div>
                <div :id="'print-head' + index">
                    <div style="position: absolute; top: 0; right: 0">
                        页码：<span class="yv-print__hide">1/1</span>
                        <span class="yv-print__show inline">
                            <font tdata="PageNO" color="black">##</font>/
                            <font tdata="PageCount" color="black">##</font>
                        </span>
                    </div>
                    <div
                        class="otitle"
                        style="
                            font-size: 20px;
                            font-weight: bold;
                            text-align: center;
                            margin-bottom: 10px;
                        "
                    >
                        零食有鸣发货单
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
                            style="width: 33%; flex-shrink: 0"
                        >
                            收货方：{{ o.receiverName }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            下单时间：{{ getMoment(o.crtDate) }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            打印次数：打印{{ o.quantity || "1" }}次
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            联系电话：{{ o.placeManTel }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            联系人：{{ o.placeMan }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            订单编号：{{ o.sheetCode }}
                        </div>

                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            发货单号：{{ o.deliveryCode }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        >
                            拣货单号：{{ o.pickCode }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 33%; flex-shrink: 0"
                        ></div>

                        <div
                            class="ohead-item"
                            style="width: 100%; flex-shrink: 0"
                        >
                            收货地址：{{ o.address }}
                        </div>
                        <div
                            class="ohead-item"
                            style="width: 100%; flex-shrink: 0"
                        >
                            备注：{{ o.remark }}
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
                            <col width="15%" />
                            <col width="30%" />
                            <col width="12%" />
                            <col width="8%" />
                            <col width="10%" />
                            <col width="20%" />
                            <col width="0%" />
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
                                    商品编码
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
                                    规格
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
                                    数量
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
                                <!-- <th
                                    style="font-size: 0; opacity: 0;overflow: hidden"
                                >
                                    金额
                                </th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(x, y) in o.commDetailDtos" :key="y">
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
                                    {{ x.commCode }}
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
                                    {{ x.pikSpec }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.unit }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.pickQty }}
                                </td>
                                <td
                                    style="
                                        border-right: 1px solid #ccc;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ x.remark }}
                                </td>
                                <!-- <td
                                    style="font-size: 0; opacity: 0;overflow: hidden"
                                >
                                    {{ x.amount || 0 }}
                                </td> -->
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="10">
                                    <div style="padding: 5px; text-align: left">
                                        <span
                                            style="
                                                margin-left: 20px;
                                                margin-right: 10px;
                                            "
                                            >本页数量</span
                                        >
                                        <span class="yv-print__hide">{{
                                            pickQtyAll[index]
                                        }}</span>
                                        <font
                                            class="yv-print__show inline"
                                            tdata="SubCount"
                                            format="0"
                                            tindex="6"
                                            >###</font
                                        >
                                        <span
                                            style="
                                                margin-left: 20px;
                                                margin-right: 10px;
                                            "
                                            >总计数量</span
                                        >
                                        <span class="yv-print__hide">{{
                                            pickQtyAll[index]
                                        }}</span>
                                        <font
                                            class="yv-print__show inline"
                                            tdata="AllCount"
                                            format="0"
                                            tindex="6"
                                            >###</font
                                        >
                                        <!-- <span
                                            style="margin-left: 20px; margin-right: 10px"
                                            >本页金额</span
                                        >
                                        <span class="yv-print__hide">{{
                                            amount[index]
                                        }}</span>
                                        <font
                                            class="yv-print__show inline"
                                            tdata="SubSum"
                                            format="#,##0.00"
                                            tindex="7"
                                            >#####</font
                                        >

                                        <span
                                            style="margin-left: 20px; margin-right: 10px"
                                            >合计金额</span
                                        >
                                        <span class="yv-print__hide">{{
                                            amount[index]
                                        }}</span>
                                        <font
                                            class="yv-print__show inline"
                                            tdata="AllSum"
                                            format="#,##0.00"
                                            tindex="7"
                                            >#####</font
                                        > -->
                                    </div>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div :style="`width: 100%;position: relative; z-index: 2;`">
                <div
                    :id="'print-foot' + index"
                    style="display: flex; justify-content: space-between"
                >
                    <div class="ofoot" style="display: flex">
                        <div
                            class="col"
                            style="
                                display: flex;
                                padding: 0 10px;
                                margin-right: 10px;
                            "
                        >
                            <div class="label" style="flex: 0 0 auto">
                                制单：
                            </div>
                            <div
                                class="content"
                                style="flex: 1 1 auto; width: 100px"
                            >
                                {{ o.createName || "" }}
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
                                复核：
                            </div>
                            <div
                                class="content"
                                style="flex: 1 1 auto; width: 100px"
                            >
                                {{ o.checkOwnerName || "" }}
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
                                打印：
                            </div>
                            <div
                                class="content"
                                style="
                                    flex: 1 1 auto;
                                    width: 100px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                "
                            >
                                {{ o.name || "" }}
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right">
                        打印时间：{{ getMoment() }}
                    </div>
                </div>
            </div>

            <div
                :id="`print-floatimg${index}`"
                class="print-floatimg"
                :style="`position: absolute; right: ${marginBox.r}; bottom: ${marginBox.b}; width: 200px; height: 200px; z-index: 1`"
            >
                <img :src="dispatchIMG" alt="" transcolor="#FFFFFF" />
            </div>
        </div>
    </div>
</template>
<script lang="jsx">
import TemplateMixin from "./mixin";
import dispatchIMG from "../img-file/dispatch.png";

export default {
    mixins: [TemplateMixin],
    props: {
        width: {
            type: String,
            default() {
                // return "241mm";
                return "210mm";
            },
        },
        height: {
            type: String,
            default() {
                // return "139.5mm";
                return "297mm";
            },
        },
        // margin: {
        //     default() {
        //         return "5mm 1cm";
        //     }
        // },
        // bodyMaxHeight: {
        //     type: String,
        //     default: "90%"
        // }
        // footerPosition: {
        //     type: String,
        //     default: "95%",
        // },
        bodyOffsetTop: {
            type: Number,
            default: 20,
        },
    },
    data() {
        return {
            dispatchIMG,
        };
    },
    computed: {
        pickQtyAll() {
            return this.printDataPost.map(({ commDetailDtos }) => {
                return commDetailDtos.reduce((tal, cur) => {
                    return tal + (cur.pickQty || 0) * 1;
                }, 0);
            });
        },
        amount() {
            return this.printDataPost.map(({ commDetailDtos }) => {
                return commDetailDtos.reduce((tal, cur) => {
                    return (
                        Math.round((tal + (cur.amount || 0) * 1) * 1000) / 1000
                    );
                }, 0);
            });
        },
        printDataPost() {
            let _postdata = [];
            _postdata = this.printData.map((item) => {
                item.commDetailDtos.sort(function (a, b) {
                    return a.commCode - b.commCode;
                });
                return {
                    ...item,
                };
            });
            // TODO: 下边的打印线上没有问题后，下个版本移除
            console.log("下个版本移除", _postdata);
            return _postdata;
        },
    },
    methods: {
        eachLoopBefore(LODOP, printerParams, i) {
            const imgHTML = this.getElementById("print-floatimg" + i);
            LODOP.ADD_PRINT_IMAGE("70%", "70%", 200, 200, imgHTML.innerHTML);
            LODOP.SET_PRINT_STYLEA(0, "HtmWaitMilSecs", 100);
            LODOP.SET_PRINT_STYLEA(0, "Stretch", 2);
            LODOP.SET_PRINT_STYLEA(0, "PageIndex", "last");
        },
        onPrintTable(LODOP, printerParams, i) {
            let header = this.getElementById("print-head" + i);
            let table = this.getElementById("print-table" + i);
            let footer = this.getElementById("print-foot" + i);
            let headerUnfirst = this.getElementById("print-head-unfirst" + i);
            let headerHeight = this.unit2mm(
                header.offsetHeight + this.bodyOffsetTop + "px"
            );
            let headerUnfirstHeight = this.unit2mm(
                headerUnfirst.offsetHeight + this.bodyOffsetTop + "px"
            );
            let classname = `${i}`;
            LODOP.NEWPAGEA();

            LODOP.SET_PRINT_PAGESIZE(
                1,
                this.unit2mm(this.width),
                this.unit2mm(this.height),
                ""
            );
            this.eachLoopBefore(...arguments);

            LODOP.ADD_PRINT_HTM(
                ...this.formatAddArgs({ b: headerHeight }),
                this.getForHTML(header.outerHTML, 0)
            );
            LODOP.SET_PRINT_STYLEA(0, "ItemName", `head-${classname}`);
            LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
            LODOP.SET_PRINT_STYLEA(0, "PageIndex", "first");

            LODOP.ADD_PRINT_TABLE(
                ...this.formatAddArgs({
                    t: headerHeight,
                    b: this.bodyMaxHeight,
                }),
                this.getForHTML(table.outerHTML, 1)
            );
            LODOP.SET_PRINT_STYLEA(0, "ItemName", `body-${classname}`);
            LODOP.SET_PRINT_STYLEA(0, "Vorient", 0);
            LODOP.SET_PRINT_STYLEA(0, "TableHeightScope", 1);

            LODOP.ADD_PRINT_HTM(
                ...this.formatAddArgs({ b: headerUnfirstHeight }),
                this.getForHTML(headerUnfirst.outerHTML, 0)
            );
            LODOP.SET_PRINT_STYLEA(0, "ItemName", `head2-${classname}`);
            LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
            LODOP.SET_PRINT_STYLEA(0, "PageUnIndex", "first");

            LODOP.ADD_PRINT_HTM(
                ...this.formatAddArgs({ t: this.footerPosition }),
                this.getForHTML(footer.outerHTML, 2)
            );
            LODOP.SET_PRINT_STYLEA(0, "ItemName", `foot-${classname}`);
            LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
            LODOP.SET_PRINT_STYLEA(0, "PageIndex", "last");

            this.eachLoopAfter(...arguments);
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
