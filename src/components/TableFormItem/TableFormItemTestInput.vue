<!--
 * @FilePath: \nita-wms-web\components\wms\TableFormItem\TableFormItemInput.vue
 * @Description:
 * @Author: intic
 * @Date: 2022-06-21 10:59:43
-->
<template>
    <Form-item
        :prop="formKey"
        class="sh-tableFrom-formItem alysa_input"
        @on-form-change="onFormChange"
    >
        <Input
            v-model.trim="value"
        ></Input>
    </Form-item>
</template>

<script lang="jsx">
export default {
    name: "TableFormItemSelect",
    // model: {
    //     prop: "value",
    //     event: "on-change",
    // },
    props: {
        value: {
            type: String,
            default: "",
        },
        formTable: Object,
        formKey: String,
        width: String,
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: String,
            default: "请输入"
        },
        clearable: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        number: {
            type: Boolean,
            default: false
        },
        autofocus: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        onFormChange(val) {
            this.$emit("on-form-change", val);
        }
    }
};
</script>
