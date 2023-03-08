<template>
    <div class="sh-filter-core">
        <ul class="sh-filter-core__head">
            <slot name="header"></slot>
        </ul>
        <div class="sh-filter-core__foot">
            <div class="sh-filter-core__foot--left">
                <slot name="btnLefts"></slot>
            </div>
            <div class="sh-filter-core__foot--right">
                <slot name="btnRights"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="jsx">
export default {
    name: "FilterCore",
    data(){
        return {
        }
    },
};
</script>
