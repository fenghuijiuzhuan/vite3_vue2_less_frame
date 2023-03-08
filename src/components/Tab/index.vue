<template>
    <div class="sh-tab">
        <template v-for="(item, index) in tabs">
            <div
                v-if="!hideTabIds.includes(item.id)"
                :key="index"
                class="sh-tab__item"
                :class="activity === item.id && 'sh-tab__active'"
                @click="onClickSwitchTab(item)"
            >
                {{ item.text }}
            </div>
        </template>
    </div>
</template>

<script lang="jsx">
export default {
    props: {
        hideTabIds: {
            type: Array,
            default: () => []
        },
        tabOptions: {
            type: Array,
            default: () => [
                {
                    text: "默认Tab"
                }
            ]
        },
        active: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            activity: this.active
        };
    },
    computed: {
        tabs() {
            return this.tabOptions.map((item, index) => {
                return Object.assign(
                    {
                        text: "",
                        id: index,
                        value: index
                    },
                    item
                );
            });
        }
    },
    watch: {
        active(val) {
            this.activity = val;
        }
    },
    methods: {
        onClickSwitchTab(tab) {
            this.activity = tab.id;
            this.$emit("on-click-switch-tab", tab.value || tab.id, tab.id, tab);
        }
    }
};
</script>
