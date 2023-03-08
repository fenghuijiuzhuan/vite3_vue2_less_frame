<template>
    <div>
        <div
            v-for="(o, index) in printDataPost"
            :key="index"
            class="paint-card"
            :style="
                `width: ${previewWidth};height: ${previewHeight};position: relative;margin: 10px auto;border: 1px dashed #ccc;padding: ${
                    marginBoxScale.t
                } ${marginBoxScale.r} ${marginBoxScale.b} ${
                    marginBoxScale.l
                };zoom: ${1 / scale}`
            "
        >
            <div
                :id="'print-page' + index"
                :style="
                    `width: ${contentPreviewWidth};height: ${contentPreviewHeight};${hasBorder &&
                        'border:' +
                            border +
                            ';'} ;overflow: hidden;box-sizing: border-box;font-size: 16px;color: #000;line-height: 1.1;display: flex;align-items: center;`
                "
            >
                <div class="row" style="width: 100%">
                    <div class="col" style="display: flex; background: #ccc">
                        <!-- <div
                            class="label"
                            style="flex: 0 0 auto"
                        ></div> -->
                        <div
                            class="content"
                            style="
                                width: 100%;
                                flex: 1 1 auto;
                                justify-content: center;
                            "
                        >
                            零食有鸣收货卡
                        </div>
                    </div>
                    <div style="display: flex">
                        <div
                            class="col"
                            style="width: 50%; flex: 1 1 auto; display: flex"
                        >
                            <div
                                class="label"
                                style="flex: 0 0 auto; width: 120px"
                            >
                                商品名称
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.commName }}
                            </div>
                        </div>
                        <div
                            class="col"
                            style="width: 50%; flex: 1 1 auto; display: flex"
                        >
                            <div
                                class="label"
                                style="flex: 0 0 auto; width: 120px"
                            >
                                生产日期
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ getMoment(o.productionDate, "YYYY-MM-DD") }}
                            </div>
                        </div>
                    </div>
                    <div style="display: flex">
                        <div
                            class="col"
                            style="width: 50%; flex: 1 1 auto; display: flex"
                        >
                            <div
                                class="label"
                                style="flex: 0 0 auto; width: 120px"
                            >
                                规格
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.pikSpec }}
                            </div>
                        </div>
                        <div
                            class="col"
                            style="width: 50%; flex: 1 1 auto; display: flex"
                        >
                            <div
                                class="label"
                                style="flex: 0 0 auto; width: 120px"
                            >
                                收货日期
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ getMoment(o.receiveDate, "YYYY-MM-DD") }}
                            </div>
                        </div>
                    </div>
                    <div style="display: flex">
                        <div
                            class="col"
                            style="width: 50%; flex: 1 1 auto; display: flex"
                        >
                            <div
                                class="label"
                                style="flex: 0 0 auto; width: 120px"
                            >
                                拣货位
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.jhw }}
                            </div>
                        </div>
                        <div
                            class="col"
                            style="width: 50%; flex: 1 1 auto; display: flex"
                        >
                            <div
                                class="label"
                                style="flex: 0 0 auto; width: 120px"
                            >
                                收货人
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                <!-- {{ o.receiveDate }} -->
                            </div>
                        </div>
                    </div>
                    <div style="display: flex">
                        <div
                            class="col"
                            style="width: 50%; flex: 1 1 auto; display: flex"
                        >
                            <div
                                class="label"
                                style="flex: 0 0 auto; width: 120px"
                            >
                                码盘规则
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.palletRule }}
                            </div>
                        </div>
                        <div
                            class="col"
                            style="width: 50%; flex: 1 1 auto; display: flex"
                        >
                            <div
                                class="label"
                                style="flex: 0 0 auto; width: 120px"
                            >
                                件数
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.palletQty }}
                            </div>
                        </div>
                    </div>
                    <div style="display: flex">
                        <div
                            class="col"
                            style="width: 50%; flex: 1 1 auto; display: flex"
                        >
                            <div
                                class="label"
                                style="flex: 0 0 auto; width: 120px"
                            >
                                上架位
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                {{ o.ccw }}
                            </div>
                        </div>
                        <div
                            class="col"
                            style="width: 50%; flex: 1 1 auto; display: flex"
                        >
                            <div
                                class="label"
                                style="flex: 0 0 auto; width: 120px"
                            >
                                上架人
                            </div>
                            <div
                                class="content"
                                style="width: 100%; flex: 1 1 auto"
                            >
                                <!-- {{ o.palletQty }} -->
                            </div>
                        </div>
                    </div>
                    <div
                        class="col"
                        style=" display: flex"
                    >
                        <div
                            class="label"
                            style="flex: 0 0 auto; width: 120px;height: 50px;"
                        >
                            商品编码
                        </div>
                        <div
                            class="content"
                            style="width: 100%; flex: 1 1 auto;height: 50px;"
                        >
                            <bar-code
                                :id="'labelbarcode' + index"
                                :code="o.commCode"
                                :codeWidth="2 * scale"
                                :codeHeight="40 * scale"
                                :displayValue="false"
                            ></bar-code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="jsx">
import TemplateMixin from "./mixin";
import BarCode from "../components/barcode.vue";

export default {
    components: {
        BarCode
    },
    mixins: [TemplateMixin],
    props: {
        width: {
            type: String,
            default: "100mm"
        },
        height: {
            type: String,
            default: "150mm"
        },
        margin: {
            type: String,
            default: "2mm"
        },
        isSerial: {
            type: Boolean,
            default: true
        },
        scale: {
            type: Number,
            default: 1
        },
        isFull: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        getForHTML(htmlstr, inject) {
            const html = this.getPageHTML(htmlstr);
            let style = `
                <style>
                    .row {
                        border-left: 1px solid #000;
                        border-top: 1px solid #000;
                    }
                    .col .content,
                    .col .label {
                        border-right: 1px solid #000;
                        border-bottom: 1px solid #000;
                        overflow-wrap: anywhere;
                        padding: 0 5px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                    }
                </style>
            `;
            return style + html;
        }
    }
};
</script>

<style scoped>
.row {
    border-left: 1px solid #000;
    border-top: 1px solid #000;
}
.col .content,
.col .label {
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    overflow-wrap: anywhere;
    padding: 0 5px;
    height: 40px;
    display: flex;
    align-items: center;
}

.yv-print__show {
    display: none;
}
</style>
