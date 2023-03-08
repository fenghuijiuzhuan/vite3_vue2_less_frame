<template>
    <Tag v-bind="$attrs">
        <slot></slot>
    </Tag>
</template>

<script lang="jsx">
export default {
    name: "TagCore",
    inheritAttrs: false
};
</script>
