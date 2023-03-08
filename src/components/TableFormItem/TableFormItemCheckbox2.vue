<template>
    <form-item
        :prop="formKey"
        :rules="$attrs.rules"
        class="sh-tableFrom-formItem alysa_common_checkbox"
    >
        <Checkbox
            v-model="formTable[formKey]"
            v-bind="$attrs"
            v-on="$listeners"
            @on-change="onFormChange"
            >{{ label }}</Checkbox
        >
    </form-item>
</template>

<script lang="jsx">
export default {
    name: "TableFormItemCheckbox",
    props: {
        formTable: Object,
        formKey: String
    },
    methods: {
        onFormChange(val) {
            this.$emit("on-form-change", val);
        }
    }
};
</script>
