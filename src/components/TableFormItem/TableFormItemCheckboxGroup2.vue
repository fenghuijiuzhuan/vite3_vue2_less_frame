<template>
    <div class="sh-tableform-checkbox-group">
        <form-item
            :prop="formKey"
            :rules="$attrs.rules"
            class="sh-tableFrom-formItem alysa_common_checkbox"
        >
            <CheckboxGroup
                v-model="formTable[formKey]"
                v-on="$listeners"
                @on-change="onFormChange"
            >
                <Checkbox
                    v-for="(item, index) in checkboxList"
                    :label="item.value"
                    v-bind="$attrs"
                    :key="index"
                >
                    {{ item.label }}
                </Checkbox>
            </CheckboxGroup>
        </form-item>
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
