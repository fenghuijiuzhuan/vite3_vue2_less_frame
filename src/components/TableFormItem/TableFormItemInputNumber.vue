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
        <InputNumber
            v-model.trim="formTable[formKey]"
            ref="iptNumber"
            v-bind="$attrs"
            v-on="bindListeners"
            @on-change="onChange"
        ></InputNumber>
    </Form-item>
</template>

<script lang="jsx">
export default {
    name: "TableFormItemInputNumber",
    props: {
        formTable: Object,
        formKey: String,
    },
    computed: {
        bindListeners() {
            const listeners = this.$listeners;
            const white = [
                "on-form-change",
                "onFormChange",
                "on-change",
                "onChange",
            ];
            const _listeners = {};
            Object.keys(listeners).forEach((i) => {
                if (!white.includes(i)) {
                    _listeners[i] = listeners[i];
                }
            });
            return _listeners;
        },
    },
    // mounted() {
    //     if (this.autofocus) {
    //         this.$refs.ipt.focus();
    //     }
    // },
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
