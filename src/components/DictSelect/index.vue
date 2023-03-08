<template>
    <div :class="className || baseClassName">
        <Select
            v-if="!isForm || (value != '21' && value != '22')"
            v-model="dictValue"
            clearable
            :transfer="transfer"
            :multiple="multiple"
            :label-in-value="labelInValue"
            :max-tag-count="maxTagCount"
            :style="'width:' + widthName"
            :placeholder="placeholder"
            :disabled="disabled || (value == '0' && isForm)"
            v-on="$listeners"
            @on-change="onChangeDictVal"
        >
            <Option
                v-for="(item, index) in dictList"
                :key="index"
                :value="item.attrValue"
                v-show="!isForm || item.isView == null || item.isView == '1'"
                :disabled="isForm && (item.attrValue == '0' || item.attrValue == '21' || item.attrValue == '22')"
            >{{ item.attrName }}</Option>
        </Select>
        <span v-else class="examine_status_notice">审批中</span>
    </div>
</template>

<script lang="jsx">
export default {
    props: {
        value: {
            type: [Number, String, Array],
            default: "",
        },
        className: {
            type: String,
            default: null,
        },
        widthName: {
            type: [Number, String],
            default: "200px",
        },
        placeholder: {
            type: String,
            default: "选择",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false
        },
        maxTagCount: {
            type: Number,
            default: 1
        },
        labelInValue: {
            type: Boolean,
            default: false
        },
        dictList: [],
        isForm: {
            type: Boolean,
            default() {
                return false;
            },
        },
        transfer: {
            type: Boolean,
            default() {
                return false;
            },
        },
    },
    // 设置绑定参数
    model: {
        props: "value",
        event: "change",
    },
    data() {
        return {
            dictValue: "",
            baseClassName: "alysa_Select",
        };
    },
    watch: {
        value: {
         immediate: true,
         handler(val){
             this.dictValue = val;
         },
        },
        isForm: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.baseClassName = "alysa_form_Select";
                } else {
                    this.baseClassName = "alysa_Select";
                }
            },
        },
    },
    methods: {
        onChangeDictVal() {
            this.$emit("change", this.dictValue);
        },
    },
};
</script>
<style lang="less" scoped>
.examine_status_notice {
    font-size: var(--sh-wms-title-font-size);
    color: @error-color;
}
</style>
