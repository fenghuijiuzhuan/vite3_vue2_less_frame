<template>
    <form-item
        :prop="formKey"
        :rules="$attrs.rules"
        class="sh-tableFrom-formItem alysa_input"
        ref="shTableFormItem"
    >
        <Tooltip
            transfer
            placement="top"
            :content="validateMessage"
            :disabled="disabledTooltip || validateState !== 'error'"
            transfer-class-name="sh-tableFrom-formItem__error"
        >
            <InputNumber
                v-model.trim="formTable[formKey]"
                :style="{ width }"
                v-bind="$attrs"
                v-on="$listeners"
                @on-change="onFormChange"
            ></InputNumber>
        </Tooltip>
    </form-item>
</template>

<script lang="jsx">
export default {
    name: "TableFormItemInputNumber2",
    props: {
        disabledTooltip: Boolean,
        formTable: Object,
        formKey: String,
        width: String,
    },
    data() {
        return {
            formItemData: {},
        };
    },
    computed: {
        validateState() {
            return this.formItemData.validateState || "";
        },
        validateMessage() {
            return this.formItemData.validateMessage || "";
        },
    },
    mounted() {
        this.formItemData = this.$refs?.shTableFormItem?.$data;
    },
    methods: {
        onFormChange() {
            this.$emit("on-form-change", this.formTable[this.formKey]);
        },
    },
};
</script>
