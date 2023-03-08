<!--
 * @FilePath: \nita-wms-web\components\wms\TableFormItem\TableFormItemTimePicker.vue
 * @Description:
 * @Author: intic
 * @Date: 2022-06-21 10:59:43
-->
<template>
    <Form-item
        :prop="formKey"
        class="sh-tableFrom-formItem alysa_datepicker"
    >
        <TimePicker
            :value="formTable[formKey]"
            :placeholder="placeholder"
            :type="type"
            :format="format"
            :steps="steps"
            :placement="placement"
            :options="options"
            :disabled="disabled"
            :clearable="clearable"
            :readonly="readonly"
            :editable="editable"
            :transfer="transfer"
            :style="{ width: width }"
            @on-change="onFormChange"
        ></TimePicker>
    </Form-item>
</template>

<script lang="jsx">
export default {
    name: "TableFormItemDatePicker",
    props: {
        formTable: Object,
        formKey: String,
        width: String,
        placeholder: {
            type: String,
            default: "请选择时间"
        },
        type: {
            type: String,
            default: "time"
        },
        format: {
            type: String,
            default: "HH:mm"
        },
        steps: {
            type: Array,
            default: []
        },
        placement: String,
        options: Object,
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
        },
        readonly: {
            type: Boolean,
            default: false
        },
        editable: {
            type: Boolean,
            default: true
        },
        transfer: {
            type: Boolean,
            default: true
        },
    },
    methods: {
        onFormChange(val) {
            this.$emit("on-form-change", val);
        }
    }
};
</script>

<style lang="less">
.table_form_item_checkbox {
    .ivu-checkbox {
        margin-right: 4px;
    }
}
</style>
