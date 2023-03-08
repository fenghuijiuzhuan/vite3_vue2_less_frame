<template>
    <tag-core v-bind="$attrs" :color="color">
        {{ text }}
    </tag-core>
</template>

<script lang="jsx">
import { getEmptyTagColor, getSolidTagColor } from "@/utils/tagColors.js";
import TagCore from "./index";
export default {
    name: "DictTag",
    inheritAttrs: false,
    components: {
        TagCore,
    },
    props: {
        dicts: {
            type: Array,
            required: true,
            default: () => [],
        },
        value: {
            type: [String, Number],
            required: true,
        },
        isSolidColor: Boolean,
    },
    computed: {
        color() {
            return this.isSolidColor ? getSolidTagColor(this.value) : getEmptyTagColor(this.value);
        },
        text() {
            return (
                this.dicts.find((item) => {
                    return String(item.attrValue) === String(this.value);
                })?.attrName || "无状态"
            );
        },
    },
};
</script>
