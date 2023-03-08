<template>
    <div>
        <div
            v-for="(o, index) in printDataPost"
            :key="index"
            :style="
                `width: ${previewWidth};height: ${previewHeight};position: relative;margin: 10px auto;border: 1px dashed #ccc;padding: ${
                    marginBoxScale.t
                } ${marginBoxScale.r} ${marginBoxScale.b} ${
                    marginBoxScale.l
                };zoom: ${1 / scale}`
            "
        >
            <div
                :id="`print-page${index}`"
                :style="
                    `width: ${contentPreviewWidth};height: ${contentPreviewHeight}; ${hasBorder &&
                        'border:' +
                            border +
                            ';'} ;box-sizing: border-box;font-size: 22px;color: #000;line-height: 1.1; display: flex; align-items: center`
                "
            >
                <div style="width: 100%">
                        <div class="col">
                            <div
                                class="content"
                                style="font-size:80px;text-align:center;font-weight: bold;"
                            >
                                {{ o.shelfCode }}
                            </div>
                        </div>
                    <div
                        class="col"
                        style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        "
                    >
                        <bar-code
                            :id="`labelbarcode${index}`"
                            :code="o.shelfCode"
                            :codeWidth="4 * scale"
                            :codeHeight="150 * scale"
                            :displayValue="false"
                            :fontSize="32"
                        ></bar-code>
                    </div>
                    <!-- <div class="col" style="display: flex">
                        <div class="label" style="flex: 0 0 auto">条码：</div>
                        <div class="content" style="width: 100%; flex: 1 1 auto; text-align: center">{{ o.tagCode }}</div>
                    </div> -->
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
            default() {
                return "100mm";
            }
        },
        height: {
            type: String,
            default() {
                return "150mm";
            }
        },
        margin: {
            type: String,
            default: "1mm 5mm"
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
};
</script>

<style scoped>
.yv-print__show {
    display: none;
}
</style>
