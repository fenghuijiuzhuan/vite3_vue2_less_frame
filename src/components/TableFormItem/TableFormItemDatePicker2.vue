<template>
    <form-item
        :prop="formKey"
        :rules="$attrs.rules"
        class="sh-tableFrom-formItem alysa_datepicker"
        ref="shTableFormItem"
    >
        <Tooltip
            transfer
            placement="top"
            :content="validateMessage"
            :disabled="disabledTooltip || validateState !== 'error'"
            transfer-class-name="sh-tableFrom-formItem__error"
        >
            <DatePicker
                :value="formTable[formKey]"
                transfer
                :style="{ width }"
                v-bind="$attrs"
                v-on="$listeners"
                @on-change="onFormChange"
            ></DatePicker>
        </Tooltip>
    </form-item>
</template>

<script lang="jsx">
export default {
    name: "TableFormItemDatePicker",
    props: {
        disabledTooltip: Boolean,
        formTable: Object,
        formKey: String,
        width: String
    },
    data() {
        return {
            formItemData: {}
        };
    },
    computed: {
        validateState() {
            return this.formItemData.validateState || "";
        },
        validateMessage() {
            return this.formItemData.validateMessage || "";
        }
    },
    mounted() {
        this.formItemData = this.$refs?.shTableFormItem?.$data;
    },
    methods: {
        onFormChange(val) {
            this.$set(this.formTable, this.formKey, val);
            this.$emit("on-form-change", val);
        }
    }
};
</script>
