<template>
    <div>
        <div
            v-for="(o, index) in printDataPost"
            :key="index"
            :style="
                `width: ${previewWidth};height: ${previewHeight};position: relative;margin: 0 auto;border: 1px dashed #ccc;padding: ${margin};`
            "
        >
            <div :id="'print-head' + index">
                <div class="otitle" style="display: flex; align-items: center">
                    <div
                        style="
                            width: 30%;
                            flex-shrink: 0;
                        "
                    >
                        <bar-code
                            :id="'jsbarcode' + index"
                            :code="o.loadingCode"
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
                        装车单
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
                            width: 30%;
                            flex-shrink: 0;
                        "
                    >
                        装车单号：{{ o.loadingCode }}
                    </div>
                    <div
                        class="ohead-item"
                        style="
                            width: 20%;
                            flex-shrink: 0;
                        "
                    >
                        单据类型：{{ o.documentType }}
                    </div>
                    <div
                        class="ohead-item"
                        style="
                            width: 20%;
                            flex-shrink: 0;
                        "
                    >
                        仓库：{{ o.whName }}
                    </div>
                    <div
                        class="ohead-item"
                        style="
                            width: 30%;
                            flex-shrink: 0;
                        "
                    >
                        制单人：{{ o.createUser }}
                    </div>
                    <div
                        class="ohead-item"
                        style="
                            width: 30%;
                            flex-shrink: 0;
                        "
                    >
                        车牌号：{{ o.plateNumber }}
                    </div>
                    <div
                        class="ohead-item"
                        style="
                            width: 40%;
                            flex-shrink: 0;
                        "
                    >
                        承运商:{{ o.carrierName }}
                    </div>
                    <div
                        class="ohead-item"
                        style="
                            width: 30%;
                            flex-shrink: 0;
                        "
                    >
                        打印时间：{{ getMoment(o.printTime) }}
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
                        <col width="5%" align="center"/>
                        <col width="15%" />
                        <col width="12%" />
                        <col width="auto" />
                        <col width="10%" align="center" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th
                                style="
                                    background-color: #eee;
                                "
                            >
                                序号
                            </th>
                            <th
                                style="
                                    background-color: #eee;
                                "
                            >
                                出库计划单号
                            </th>
                            <th
                                style="
                                    background-color: #eee;
                                "
                            >
                                客户名称
                            </th>
                            <th
                                style="
                                    background-color: #eee;
                                "
                            >
                                收货地址
                            </th>
                            <th
                                style="
                                    background-color: #eee;
                                "
                            >
                                暂存区
                            </th>
                            <th
                                style="
                                    background-color: #eee;
                                "
                            >
                                装车情况
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(x, y) in o.deliveryDetails" :key="y">
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                "
                            >
                                {{ y + 1 }}
                            </td>
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                "
                            >
                                {{ x.deliveryCode }}
                            </td>
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                "
                            >
                                <p style="width: 80%; margin: 10px 0">
                                    {{ x.receiverName }}
                                </p>
                            </td>
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                "
                            >
                                {{ x.address }}
                            </td>
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                "
                            >
                                {{ x.wmpShelfCode }}
                            </td>
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                "
                            ></td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
        // bodyOffsetTop: { // 内容顶部上下偏移，单位px，标签无效
        //     type: Number,
        //     default: 30
        // },
    }
};
</script>

<style scoped>
.yv-print__show {
    display: none;
}
</style>
