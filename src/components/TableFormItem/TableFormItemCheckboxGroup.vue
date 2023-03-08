<!--
 * @FilePath: \nita-wms-web\components\wms\TableFormItem\TableFormItemCheckboxGroup.vue
 * @Description:
 * @Author: intic
 * @Date: 2022-06-21 10:59:43
-->
<template>
    <div class="sh-tableform-checkbox-group">
        <Form-item
            :prop="formKey"
            class="sh-tableFrom-formItem alysa_common_checkbox"
        >
            <CheckboxGroup :value="formTable[formKey]" @on-change="onFormChange">
                <Checkbox
                    v-for="(item, index) in checkboxList"
                    :label="item[_checkValue]"
                    :disabled="disabled"
                    :key="index"
                    >{{ item[_checkName] }}</Checkbox
                >
            </CheckboxGroup>
        </Form-item>
    </div>
</template>

<script lang="jsx">
export default {
    name: "TableFormItemCheckbox",
    props: {
        formTable: Object,
        formKey: String,
        checkboxList: {
            default: () => []
        },
        _checkValue: {
            type: String,
            default: "value"
        },
        _checkName: {
            type: String,
            default: "name"
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onFormChange(val) {
            this.$emit("on-form-change", val);
        }
    }
};
</script>

<style lang="less" scoped>
.sh-tableform-checkbox-group {
    /deep/ .ivu-checkbox-group-item {
        margin-right: 25px;

        .ivu-checkbox {
            margin-right: 4px;
        }
    }
}
</style>
