<!--
 * @FilePath: \nita-wms-web\components\wms\TableFormItem\TableFormItemSelect.vue
 * @Description:
 * @Author: intic
 * @Date: 2022-06-21 10:59:43
-->
<template>
    <Form-item
        :prop="formKey"
        class="sh-tableFrom-formItem alysa_form_Select"
        @on-form-change="onFormChange"
        ref="shTableFormItemSelect"
    >
        <Tooltip
            transfer
            :content="validateMessage"
            :disabled="disabledTooltip || validateState !== 'error'"
            transfer-class-name="sh-tableFrom-formItem__error"
        >
            <Select
                v-model="formTable[formKey]"
                :placeholder="placeholder"
                :multiple="multiple"
                :disabled="disabled"
                :clearable="clearable"
                :filterable="filterable"
                :placement="placement"
                :type="type"
                :transfer="transfer"
                :filter-by-label="filterByLabel"
                :not-found-text="notFoundText"
                :style="{ width: width }"
                v-bind="$attrs"
                v-on="$listeners"
                @on-change="onChange"
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
    </Form-item>
</template>

<script lang="jsx">
export default {
    name: "TableFormItemSelect",
    props: {
        disabledTooltip: Boolean,
        formTable: Object,
        formKey: String,
        selectList: {
            default: () => [],
        },
        placeholder: {
            type: String,
            default: "请选择",
        },
        width: String,
        selectValue: {
            type: String,
            default: "value",
        },
        selectName: {
            type: String,
            default: "name",
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        filterable: {
            type: Boolean,
            default: false,
        },
        filterByLabel: {
            type: Boolean,
            default: false,
        },
        notFoundText: String,
        placement: String,
        type: {
            type: String,
            default: "text",
        },
        transfer: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            formItemData: {},
        };
    },
    mounted() {
        this.formItemData = this.$refs?.shTableFormItemSelect?.$data;
    },
    computed: {
        validateState() {
            return this.formItemData.validateState || "";
        },
        validateMessage() {
            return this.formItemData.validateMessage || "";
        },
    },
    methods: {
        onChange() {
            if (this.type === "number") {
                this.formTable[this.formKey] = Number(
                    this.formTable[this.formKey]
                );
            }
            this.$emit("on-change", ...arguments);
        },
        onFormChange(val) {
            this.$emit("on-form-change", val);
        },
    },
};
</script>
