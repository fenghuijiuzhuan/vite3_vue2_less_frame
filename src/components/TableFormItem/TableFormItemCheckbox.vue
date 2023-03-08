<!--
 * @FilePath: \nita-wms-web\components\wms\TableFormItem\TableFormItemCheckbox.vue
 * @Description:
 * @Author: intic
 * @Date: 2022-06-21 10:59:43
-->
<template>
    <Form-item
        :prop="formKey"
        class="sh-tableFrom-formItem alysa_common_checkbox"
        @on-form-change="onFormChange"
    >
        <Checkbox
            v-model="formTable[formKey]"
            :disabled="disabled"
            :indeterminate="indeterminate"
            :true-value="trueValue"
            :false-value="falseValue"
            >{{ label }}</Checkbox
        >
    </Form-item>
</template>

<script lang="jsx">
export default {
    name: "TableFormItemCheckbox",
    props: {
        formTable: Object,
        formKey: String,
        value: {
            type: Boolean,
            default: false
        },
        label: String | Number | Boolean,
        disabled: {
            type: Boolean,
            default: false
        },
        indeterminate: {
            type: Boolean,
            default: false
        },
        trueValue: String | Number | Boolean,
        falseValue: String | Number | Boolean,
    },
    methods: {
        onFormChange(val) {
            this.$emit("on-form-change", val);
        }
    }
};
</script>
