<template>
    <dialog-core v-model="isShow" v-bind="modalOptions" v-on="$listeners">
        <template v-slot:header>
            <slot name="header">
                <d-header
                    slot="header"
                    :content="title"
                    @onClose="onClose"
                ></d-header>
            </slot>
        </template>

        <slot></slot>

        <template v-slot:footer>
            <slot name="footer">
                <wms-button-camp
                    :btns="btns"
                    v-on="btnsEvents"
                ></wms-button-camp>
            </slot>
        </template>
        <input type="text" :value="show" style="display: none" />
    </dialog-core>
</template>

<script lang="jsx">
import DHeader from "./header.vue";
import DialogCore from "./Core/index.vue";
export default {
    name: "DialogWrap",
    components: {
        DHeader,
        DialogCore,
    },
    model: {
        prop: "show",
        event: "on-change",
    },
    props: {
        show: Boolean,
        width: {
            type: String,
            default: "650px",
        },
        maskClosable: {
            type: Boolean,
            default: false,
        },
        closable: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "默认标题",
        },
        btns: {
            type: Array,
            default() {
                return [
                    {
                        class: "alysa_btn_error",
                        type: "error",
                        text: "取消",
                        onClick: "on-cancel",
                    },
                    {
                        class: "alysa_btn_primary",
                        type: "primary",
                        text: "确定",
                        onClick: "on-ok",
                    },
                ];
            },
        },
    },
    computed: {
        btnsEvents() {
            return this.handleFilterArrItems(this.btns);
        },
        isShow: {
            get() {
                return this.show;
            },
            set(val) {
                this.$emit("on-change", val);
            },
        },
        modalOptions() {
            return Object.assign({}, this.$props, this.$attrs, { title: null });
        },
    },
    methods: {
        handleFilterArrItems(data, eventobj = {}) {
            return data.reduce((tal, cur) => {
                if (Array.isArray(cur)) {
                    tal = {
                        ...this.handleFilterArrItems(item, tal),
                    };
                } else {
                    const { onClick } = cur;
                    if (["on-cancel", "onCancel"].includes(onClick)) {
                        tal[onClick] = this.onCancel;
                    } else if (["on-close", "onClose"].includes(onClick)) {
                        tal[onClick] = this.onClose;
                    } else if (!tal[onClick]) {
                        tal[onClick] = (callback) => {
                            this.$emit(onClick, callback);
                        };
                    }
                }
                return tal;
            }, eventobj);
        },
        onClose() {
            this.isShow = false;
            this.$emit("on-close");
        },
        onCancel(callback) {
            this.isShow = false;
            this.$emit("on-cancel", callback);
        },
    },
};
</script>
