<template>
    <form-item
        :prop="formKey"
        :rules="$attrs.rules"
        class="sh-tableFrom-formItem alysa_form_Select"
        ref="shTableFormItem"
    >
        <Tooltip
            transfer
            placement="top"
            :content="validateMessage"
            :disabled="disabledTooltip || validateState !== 'error'"
            transfer-class-name="sh-tableFrom-formItem__error"
        >
            <Select
                v-if="$attrs.type === 'number'"
                v-model.number="formTable[formKey]"
                transfer
                :style="{ width }"
                v-bind="$attrs"
                v-on="$listeners"
                label-in-value
                @on-change="onFormChange"
            >
                <Option
                    v-for="(item, index) in selectList"
                    :value="item[selectValue]"
                    :key="index"
                    :label="item[selectName]"
                >
                    {{ item[selectName] }}
                </Option>
            </Select>
            <Select
                v-else
                v-model="formTable[formKey]"
                transfer
                :style="{ width }"
                v-bind="$attrs"
                label-in-value
                v-on="$listeners"
                @on-change="onFormChange"
            >
                <Option
                    v-for="(item, index) in selectList"
                    :value="item[selectValue]"
                    :key="index"
                    :label="item[selectName]"
                >
                    {{ item[selectName] }}
                </Option>
            </Select>
        </Tooltip>
    </form-item>
</template>

<script lang="jsx">
export default {
    name: "TableFormItemSelect",
    props: {
        disabledTooltip: Boolean,
        formTable: Object,
        formKey: String,
        width: String,
        selectList: {
            default: () => [],
        },
        selectValue: {
            type: String,
            default: "value",
        },
        selectName: {
            type: String,
            default: "name",
        },
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
        onFormChange(val) {
            const data = this.selectList.find((i) => {
                return i[this.selectValue] === val.value && i[this.selectName] === val.label;
            });
            this.$emit(
                "on-form-change",
                val.value,
                data,
                val
            );
        },
    },
};
</script>
