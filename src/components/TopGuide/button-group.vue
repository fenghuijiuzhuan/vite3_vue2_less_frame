<template>
    <div class="sh-guide-btngroup">
        <template v-if="isOver">
            <wms-button-camp
                :btns="[
                    {
                        text: '跳过',
                        class: 'alysa_btn_primary',
                        size: 'small',
                        type: 'primary',
                        onClick: 'onClose',
                    },
                ]"
                @onClose="$emit('onClose')"
            ></wms-button-camp>
        </template>
        <template v-else>
            <wms-button-camp
                :btns="[
                    {
                        text: '跳过',
                        class: 'alysa_btn_primary',
                        size: 'small',
                        type: 'primary',
                        onClick: 'onClose',
                    },
                    {
                        text: '下一步',
                        class: 'alysa_btn_primary',
                        size: 'small',
                        type: 'primary',
                        onClick: 'onNext',
                    },
                ]"
                @onClose="$emit('onClose')"
                @onNext="$emit('onNext')"
            ></wms-button-camp>
        </template>
    </div>
</template>
<script lang="jsx">
import ButtonCamp from "../ButtonCamp"
export default {
    name: "GuideBtngroup",
    components: {
        ButtonCamp
    },
    props: {
        isOver: Boolean,
    },
};
</script>
