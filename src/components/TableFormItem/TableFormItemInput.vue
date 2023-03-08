<!--
 * @FilePath: \nita-wms-web\components\wms\TableFormItem\TableFormItemInput.vue
 * @Description:
 * @Author: intic
 * @Date: 2022-06-21 10:59:43
-->
<template>
    <Form-item
        :prop="formKey"
        :rules="rules"
        class="sh-tableFrom-formItem alysa_input"
        @on-form-change="onFormChange"
        ref="shTableFromItemInput"
    >
        <Tooltip
            transfer
            :content="validateMessage"
            :disabled="disabledTooltip || validateState !== 'error'"
            transfer-class-name="sh-tableFrom-formItem__error"
        >
            <Input
                v-model.trim="formTable[formKey]"
                ref="ipt"
                :type="type"
                :placeholder="placeholder"
                :clearable="clearable"
                :disabled="disabled"
                :readonly="readonly"
                :number="number"
                :autofocus="autofocus"
                :style="{ width: width }"
                :maxlength="maxlength"
                v-bind="$attrs"
                v-on="bindListeners"
                @on-change="onChange"
            ></Input>
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
        width: String,
        type: {
            type: String,
            default: "text",
        },
        placeholder: {
            type: String,
            default: "请输入",
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        number: {
            type: Boolean,
            default: false,
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        maxlength: {
            type: Number,
            default: undefined,
        },
        rules: {
            type: Object | Array,
            default: undefined,
        },
    },
    data() {
        return {
            formItemData: {},
        };
    },
    computed: {
        bindListeners() {
            const listeners = this.$listeners;
            const white = ["on-form-change", "onFormChange"];
            const _listeners = {};
            Object.keys(listeners).forEach((i) => {
                if (!white.includes(i)) {
                    _listeners[i] = listeners[i];
                }
            });
            return _listeners;
        },
        validateState() {
            return this.formItemData.validateState || "";
        },
        validateMessage() {
            return this.formItemData.validateMessage || "";
        },
    },
    mounted() {
        if (this.autofocus) {
            this.$refs.ipt.focus();
        }
        this.formItemData = this.$refs?.shTableFromItemInput?.$data;

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
