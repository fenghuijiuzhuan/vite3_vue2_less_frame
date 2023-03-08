<template>
    <div>
        <div
            v-for="(o, index) in printDataPost"
            :key="index"
            :style="
                `width: ${previewWidth};height: ${previewHeight};position: relative;margin: 0 auto;border: 1px dashed #ccc;padding: ${
                    marginBoxScale.t
                } ${marginBoxScale.r} ${marginBoxScale.b} ${
                    marginBoxScale.l
                };zoom: ${1 / scale}`
            "
        >
            <div :id="'print-head' + index">
                <div
                    class="otitle"
                    style="
                        display: flex;
                        align-items: center;
                        margin-bottom: 20px;
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
                        <bar-code
                            :id="'jsbarcode' + index"
                            :code="o.checkinCode"
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
                        收货指引单
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
                        style="
                            width: 45%;
                            height: 40px;
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;
                        "
                    >
                        收货单号：{{ o.checkinCode }}
                    </div>
                    <div
                        class="ohead-item"
                        style="
                            width: 15%;
                            height: 40px;
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;
                        "
                    >
                        单据类型：{{ o.receiveTypeName }}
                    </div>
                    <div
                        class="ohead-item"
                        style="
                            width: 15%;
                            height: 40px;
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;
                        "
                    >
                        仓库：{{ o.whName }}
                    </div>
                    <!-- <div
                        class="ohead-item"
                        style="
                            width: 15%;
                            height: 40px;
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;
                        "
                    >
                        分仓：{{ o.storeareaCode }}
                    </div> -->
                    <div
                        class="ohead-item"
                        style="
                            width: 25%;
                            height: 40px;
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;
                        "
                    >
                        制单人：{{ o.printName }}
                    </div>

                    <div
                        class="ohead-item"
                        style="
                            width: 45%;
                            height: 40px;
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;
                        "
                    >
                        供应商：{{ o.deliverCode
                        }}{{ o.deliverName ? `/${o.deliverName}` : "" }}
                    </div>
                    <div
                        class="ohead-item"
                        style="
                            width: 30%;
                            height: 40px;
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;
                        "
                    >
                        到货时间：{{ o.signDeliveryDate }}
                    </div>
                    <!-- <div
                        class="ohead-item"
                        style="
                            width: 15%;
                            height: 40px;
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;
                        "
                    >
                        收货口：{{ o.receivePort }}
                    </div> -->
                    <div
                        class="ohead-item"
                        style="
                            width: 25%;
                            height: 40px;
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;
                        "
                    >
                        打印时间：{{ getMoment(o.printDate) }}
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
                        text-align: center;
                        border-top: 1px solid #ccc;
                        font-size: 10px;
                    "
                >
                    <colgroup>
                        <col style="width: 4%" />
                        <col align="left" style="width: 5%" />
                        <col align="left" style="width: 10%" />
                        <col style="width: 8%" />
                        <col style="width: 8%" />
                        <col style="width: 8%" />
                        <col style="width: 8%" />
                        <col style="width: 8%" />
                        <col style="width: 8%" />
                        <col style="width: auto" />
                        <col style="width: 8%" />
                        <col style="width: 8%" />
                        <col style="width: 8%" />
                        <!-- <col style="width: auto" /> -->
                    </colgroup>
                    <thead>
                        <tr>
                            <th style="background-color: #eee">序号</th>
                            <th style="background-color: #eee">商品编码</th>
                            <th style="background-color: #eee">商品名称</th>
                            <th style="background-color: #eee">包装规格</th>
                            <th style="background-color: #eee">采购单位</th>
                            <th style="background-color: #eee">采购数量</th>
                            <th style="background-color: #eee">赠品数量</th>
                            <th style="background-color: #eee">总数量</th>
                            <th style="background-color: #eee">码盘规则</th>
                            <th style="background-color: #eee">收货任务码</th>
                            <th style="background-color: #eee">预计托盘数</th>
                            <th style="background-color: #eee">
                                上次收货生产日期
                            </th>
                            <th style="background-color: #eee">收货人</th>
                            <!-- <th style="background-color: #eee">审核人</th> -->
                        </tr>
                    </thead>
                    <tbody v-if="o.commList && o.commList.length">
                        <tr v-for="(x, y) in o.commList" :key="y">
                            <td style="border-bottom: 1px solid #eee">
                                {{ y + 1 }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.commCode }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.commName }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.pikSpec }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.unit }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.requireQty }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.requirePresentQty }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.requireTtlDetailQty }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.dcStackLevel }} * {{ x.dcStackNum }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <bar-code
                                    :id="'jsbarcode' + index + y"
                                    :code="x.commUpc"
                                    :codeHeight="40"
                                    :marginLeft="0"
                                    :marginRight="0"
                                    :fontSize="14"
                                />
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ Math.ceil(x.requireTtlDetailQty / (x.dcStackLevel * x.dcStackNum)) }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.receiveProductionDateLast }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.receiveUserName }}
                            </td>
                            <!-- <td style="border-bottom: 1px solid #eee"></td> -->
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th
                                colspan="7"
                                align="left"
                                style="font-size: 12px"
                            >
                                合计：
                            </th>
                            <th
                                style="font-size: 12px"
                                tdata="SubSum"
                                format="0"
                                tindex="8"
                            >
                                <font class="yv-print__show inline">#####</font>
                                <span class="yv-print__hide">{{
                                    sum(
                                        o.commList.map(
                                            i => i.requireTtlDetailQty || 0
                                        )
                                    )
                                }}</span>
                            </th>
                            <th colspan="2"></th>
                            <th
                                style="font-size: 12px"
                                tdata="SubSum"
                                format="0"
                                tindex="11"
                            >
                                <font class="yv-print__show inline">#####</font>
                                <span class="yv-print__hide">{{
                                    sum(
                                        o.commList.map(
                                            i => Math.ceil(i.requireTtlDetailQty / (i.dcStackLevel * i.dcStackNum))
                                        )
                                    )
                                }}</span>
                            </th>
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
