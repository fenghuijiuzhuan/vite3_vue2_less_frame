<template>
    <transition name="fade">
        <div class="sh-guide" v-if="isShow">
            <div class="sh-guide-wrap" :style="boxStyle">
                <div class="sh-guide__body" :class="`sh-guide__${data.direction}`" :style="handleStyle">
                    <img :src="positionImg" alt="箭头" />
                    <div class="sh-guide__content">
                        <p class="sh-guide__content--title">
                            {{ data.content }}
                        </p>
                        <btn-group :isOver="isOver" @onClose="onClose" @onNext="onNext" />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="jsx">
import BtnGroup from "./button-group";
// const hideAllGuide = "HIDE_ALL_GUIDE";
import bottomRightPng from "./img/bottom-right.png";
import bottomLeftPng from "./img/bottom-left.png";
import topRightPng from "./img/top-right.png";
import topLeftPng from "./img/top-left.png";
import rightBottomPng from "./img/right-bottom.png";
const SH_GUIDE_POSITION_IMG = {
    "bottom-right": bottomRightPng,
    "bottom-left": bottomLeftPng,
    "top-right": topRightPng,
    "top-left": topLeftPng,
    "right-bottom": rightBottomPng,
};
import { ready } from "@/utils";
export default {
    name: "TopGuide",

    components: {
        BtnGroup,
    },

    data() {
        return {
            isShow: false,
            data: {},
            boxStyle: {},
            handleStyle: {},
            currentIndex: 0,
            stepList: [],
        };
    },
    computed: {
        isOver() {
            return this.currentIndex === this.stepList.length - 1;
        },
        positionImg() {
            return SH_GUIDE_POSITION_IMG[this.data.direction];
        },
    },

    methods: {
        init(steps, delay = 300) {
            this.stepList = steps;
            this.$data._preStepItem = {};
            this.currentIndex = 0;
            setTimeout(ready, delay, () => {
                this._initBoxPosition(this.currentIndex);
            });
        },
        onClose() {
            typeof this.$data._preStepItem.leaveHandle === "function" && this.$data._preStepItem.leaveHandle();
            // if (!this.isOver) this.closeAllGuide();
            this.$emit("onClose");
            this.isShow = false;
        },

        // closeAllGuide() {
        //     window.localStorage.setItem(hideAllGuide, true);
        // },

        onNext() {
            typeof this.$data._preStepItem.leaveHandle === "function" && this.$data._preStepItem.leaveHandle();
            this.currentIndex++;
            this._initBoxPosition(this.currentIndex);
        },

        _initBoxPosition(index) {
            const stepItem = this.stepList[index];
            this.$data._preStepItem = stepItem;

            typeof stepItem.activeHandle === "function" && stepItem.activeHandle();

            setTimeout(() => {
                if (typeof stepItem.el === "function" ? !stepItem.el() : !stepItem.el) {
                    typeof stepItem.leaveHandle === "function" && stepItem.leaveHandle();
                    if (!this.isOver) return this.onNext();
                    this.$emit("onClose");
                    this.$Message.success("引导已关闭");

                    return;
                }

                const rect =
                    typeof stepItem.el === "function"
                        ? stepItem.el().getBoundingClientRect()
                        : stepItem.el.getBoundingClientRect();
                const data = {
                    direction: stepItem.direction,
                    content: stepItem.content,
                };

                const boxStyle = {
                    left: rect.left + "px",
                    top: rect.top + "px",
                    width: rect.width + "px",
                    height: rect.height + "px",
                };

                this.$nextTick(() => {
                    this.data = data;
                    this.boxStyle = boxStyle;
                    this.handleStyle = {
                        marginTop: rect.height + 16 + "px",
                    };
                    this.isShow = true;
                });
            }, stepItem.delay || 200);
        },
    },
};
</script>
