<template>
    <form-item
        :prop="formKey"
        :rules="$attrs.rules"
        class="sh-tableFrom-formItem alysa_datepicker"
    >
        <TimePicker
            v-model="formTable[formKey]"
            transfer
            :style="{ width }"
            v-bind="$attrs"
            v-on="$listeners"
            @on-change="onFormChange"
        ></TimePicker>
    </form-item>
</template>

<script lang="jsx">
export default {
    name: "TableFormItemDatePicker",
    props: {
        formTable: Object,
        formKey: String,
        width: String
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
