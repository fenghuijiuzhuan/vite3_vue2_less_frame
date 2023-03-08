<template>
    <Modal
        v-model="isShow"
        class-name="sh-dialog"
        v-bind="modalOptions"
        v-on="$listeners"
        class="sh-dialog-wraper"
    >
        <template v-slot:header>
            <slot name="header"></slot>
        </template>
        <slot></slot>
        <template v-slot:footer>
            <slot name="footer"></slot>
        </template>
        <input type="text" :value="show" style="display: none" />
    </Modal>
</template>

<script lang="jsx">
export default {
    name: "DialogCore",
    model: {
        prop: "show",
        event: "on-change",
    },
    props: {
        show: Boolean,
    },
    computed: {
        isShow: {
            get() {
                return this.show;
            },
            set(val) {
                this.$emit("on-change", val);
            },
        },
        modalOptions() {
            return Object.assign({}, this.$props, this.$attrs);
        },
    },
};
</script>
