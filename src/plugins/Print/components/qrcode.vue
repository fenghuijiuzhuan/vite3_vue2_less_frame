<template>
    <vue-qr v-bind="$attrs" :size="size" />
</template>

<script lang="jsx">
import VueQr from "vue-qr";
export default {
    components: {
        VueQr
    },
    props: {
        size: {
            type: Number,
            default: 120
        },
    }
};
</script>
