<template>
    <div class="sh-buttoncamp">
        <template v-for="(item, index) in postBtns">
            <div v-if="!item.hide" :key="index" class="sh-buttoncamp__btnwrap">
                <Dropdown
                    v-if="Array.isArray(item) && item.length"
                    transfer
                    @on-click="
                        (name) =>
                            onClickButton(
                                name.split('__')[0],
                                index + '-' + name.split('__')[1]
                            )
                    "
                >
                    <div v-if="!item[0].hide" :class="item[0].class">
                        <Button v-bind="item[0].bind">
                            <Icon
                                v-if="item[0].icon"
                                :type="item[0].icon"
                                :size="item[0].iconSize"
                            />
                            {{ item[0].text }}
                        </Button>
                    </div>

                    <DropdownMenu slot="list">
                        <div
                            v-for="(dropItem, dropIndex) in item"
                            :key="`${index}_${dropIndex}`"
                        >
                            <DropdownItem
                                v-if="dropIndex !== 0 && !dropItem.hide"
                                v-bind="dropItem.bind"
                                :name="dropItem.onClick + '__' + dropIndex"
                            >
                                <Icon
                                    v-if="dropItem.icon"
                                    :type="dropItem.icon"
                                    :size="dropItem.iconSize"
                                />
                                {{ dropItem.text }}
                            </DropdownItem>
                        </div>
                    </DropdownMenu>
                </Dropdown>
                <template v-else>
                    <div :class="item.class">
                        <Button
                            v-bind="item.bind"
                            @click.stop.native="onClickButton(item.onClick, index)"
                        >
                            <Icon
                                v-if="item.icon"
                                :type="item.icon"
                                :size="item.iconSize"
                            />
                            {{ item.text }}
                        </Button>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<script lang="jsx">
import _ from "lodash";
export default {
    name: "ButtonCamp",
    props: {
        btns: {
            type: Array,
            default() {
                return [
                    {
                        class: "alysa_btn_error",
                        type: "error",
                        text: "取消",
                        onClick: "onCancel",
                    },
                    {
                        class: "alysa_btn_primary",
                        type: "primary",
                        text: "确定",
                        onClick: "onOk",
                    },
                ];
            },
        },
    },
    data() {
        return {
            centerBtns: _.cloneDeep(this.btns),
        };
    },
    computed: {
        postBtns() {
            return this.handleFilterArrItems(this.centerBtns);
        },
    },
    watch: {
        btns: {
            deep: true,
            handler (val) {
                this.centerBtns = _.cloneDeep(val);
            }
        }
    },
    methods: {
        handleFilterArrItems(data) {
            if (Array.isArray(data)) {
                return data.map((item) => {
                    return this.handleFilterArrItems(item);
                });
            }
            const {
                type,
                disabled,
                loading,
                ghost,
                size,
                shape,
                htmlType,
                icon,
                iconSize,
                customIcon,
                to,
                replace,
                target,
                append,
                style,
            } = data;
            return {
                ...data,
                bind: {
                    type,
                    ghost,
                    size,
                    shape,
                    htmlType,
                    disabled,
                    loading,
                    to,
                    replace,
                    target,
                    append,
                    style,
                },
            };
        },
        onClickButton(e, index) {
            // console.log(e, index, this.$listeners);
            const _self = this;
            const callback = function (property, value, _index) {
                if (_index === undefined || _index === null) {
                    _index = index;
                }
                const __index = (_index + "").split("-");

                let target = __index.reduce((tal, cur) => {
                    return tal[cur];
                }, _self.centerBtns);

                _self.$set(target, property, value);
            };
            this.$emit(e, callback);
        },
    },
};
</script>
