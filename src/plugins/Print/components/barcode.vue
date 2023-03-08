<template>
    <svg :id="id" v-if="code"></svg>
</template>

<script lang="jsx">
const JsBarcode = require("jsbarcode");
export default {
    props: {
        id: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            default: "",
        },
        codeWidth: {
            type: Number,
            default: 1.5,
        },
        codeHeight: Number,
        margin: {
            default: 0,
        },
    },
    computed: {
        formatEncode() {
            if (this.$attrs.format) {
                if (this.$attrs.format === "EAN13" && this.code.length === 12) {
                    return this.$attrs.format;
                }
                return "CODE128";
            }
            return "CODE128";
        },
    },
    watch: {
        id(val) {
            if (val) {
                this.createBarCode();
            }
        },
    },
    mounted() {
        this.createBarCode();
    },
    methods: {
        createBarCode() {
            if (this.code) {
                JsBarcode("#" + this.id, this.code, {
                    ...this.$attrs,
                    format: this.formatEncode,
                    margin: this.margin,
                    width: this.codeWidth,
                    height: this.codeHeight,
                });
            }
        },
    },
};
</script>
