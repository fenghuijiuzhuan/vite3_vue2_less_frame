<!--
 * @FilePath: \nita-wms-web\components\wms\TableFormItem\TableFormItemDatePicker.vue
 * @Description:
 * @Author: intic
 * @Date: 2022-06-21 10:59:43
-->
<template>
    <Form-item
        :prop="formKey"
        class="sh-tableFrom-formItem alysa_datepicker"
        @on-form-change="onFormChange"
    >
        <DatePicker
            v-model="formTable[formKey]"
            :placeholder="placeholder"
            :type="type"
            :format="format"
            :placement="placement"
            :options="options"
            :disabled="disabled"
            :clearable="clearable"
            :readonly="readonly"
            :editable="editable"
            :transfer="transfer"
            :time-picker-options="timePickerOptions"
            :style="{ width: width }"
        ></DatePicker>
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
            default: "date"
        },
        format: {
            type: String,
            default: "yyyy-MM-dd"
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
        timePickerOptions: Object
    },
    methods: {
        onFormChange(val) {
            this.$emit("on-form-change", val);
        }
    }
};
</script>
