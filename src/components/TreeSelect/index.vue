<template>
    <treeselect class="sh-tree-select" v-model="valuec" v-bind="$attrs" v-on="$listeners" />
</template>

<script lang="jsx">
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
    components: { Treeselect },
    model: {
        prop: "value",
        event: "update:value"
    },
    props: {
        value: {
            type: [String, Number, Array]
        }
    },
    computed: {
        valuec: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("update:value", val);
            }
        }
    }
};
</script>
