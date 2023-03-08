<template>
    <div>
        <div
            v-for="(o, index) in printData"
            :key="index"
            :style="`width: ${previewWidth};min-height: ${previewHeight};position: relative;margin: 0 auto;border: 1px dashed #ccc;padding: ${
                marginBoxScale.t
            } ${marginBoxScale.r} ${marginBoxScale.b} ${
                marginBoxScale.l
            };zoom: ${1 / scale}`"
        >
            <div :id="'print-head' + index" style="font-size: 12px">
                <div class="otitle" style="display: flex; align-items: center">
                    <div
                        style="
                            font-size: 20px;
                            font-weight: bold;
                            text-align: center;
                            width: 100%;
                        "
                    >
                        商品补货计划
                    </div>
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
                    <div class="ohead-item" style="width: 20%; flex-shrink: 0">
                        仓库：{{ o.whName }}
                    </div>
                    <div class="ohead-item" style="width: 30%; flex-shrink: 0">
                        计划批次号：{{ o.batchCode }}
                    </div>
                    <div class="ohead-item" style="width: 20%; flex-shrink: 0">
                        制单人：{{ o.createUserName }}
                    </div>
                    <div class="ohead-item" style="width: 30%; flex-shrink: 0">
                        制单时间：{{ o.createDate }}
                    </div>
                </div>
            </div>
            <div class="obody" :id="'print-table' + index">
                <table
                    width="100%"
                    cellspacing="0"
                    cellpadding="5"
                    border="0"
                    style="
                        text-align: left;
                        border-top: 1px solid #ccc;
                        font-size: 10px;
                    "
                >
                    <colgroup>
                        <col width="5%" align="center" />
                        <col width="20%" />
                        <col width="auto" align="center" />
                        <col width="10%" />
                        <col width="8%" align="center" />
                        <col width="10%" align="center" />
                        <col width="10%" align="center" />
                        <col width="10%" align="center" />
                        <col width="8%" align="center" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th style="background-color: #eee">序号</th>
                            <th style="background-color: #eee">任务条形码</th>
                            <th style="background-color: #eee">商品名称</th>
                            <th style="background-color: #eee">规格</th>
                            <th style="background-color: #eee">单位</th>
                            <th style="background-color: #eee">移入拣货位</th>
                            <th style="background-color: #eee">建议补货数量</th>
                            <th style="background-color: #eee">
                                移出推荐存储位
                            </th>
                            <th
                                style="
                                    background-color: #eee;
                                    text-align: center;
                                "
                            >
                                存储位可用库存
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(x, y) in o.wmpReplenishmentApplicationVos"
                            :key="y"
                        >
                            <td style="border-bottom: 1px solid #eee">
                                {{ y + 1 }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <bar-code
                                    :id="'jsbarcode' + index + y"
                                    :code="x.taskCode"
                                    :codeHeight="40"
                                    :marginTop="10"
                                    :marginLeft="0"
                                    :marginRight="0"
                                    :fontSize="14"
                                ></bar-code>
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <div>{{ x.commName }}</div>
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                {{ x.pikSpec }}
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <div>{{ x.unit }}</div>
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <div>{{ x.pickShelfCode }}</div>
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <div>{{ x.salQty }}</div>
                            </td>
                            <td style="border-bottom: 1px solid #eee">
                                <div>{{ x.storageShelfCode }}</div>
                            </td>
                            <td
                                style="
                                    border-bottom: 1px solid #eee;
                                    text-align: center;
                                "
                            >
                                {{ x.availableQty }}
                            </td>
                        </tr>
                    </tbody>
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
