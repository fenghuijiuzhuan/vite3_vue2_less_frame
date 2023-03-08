<template>
  <div>
    <transition name="fade">
      <Spin v-if="isShow" class="sh-view-loading" :size="size" :fix="fix">
        <div class="sh-view-loading__content">
          <Icon v-bind="option" class="sh-view-loading__icon sh-view-loading__icon--load" />
          <div :style="option.font">
            {{ content }}
          </div>
        </div>
      </Spin>
    </transition>
  </div>
</template>

<script lang="jsx">
export default {
  props: {
    size: String,
    fix: {
      type: Boolean,
      default: true,
    },
    content: {
      type: String,
      default: '正在加载，请稍等...',
    },
    option: {
      type: Object,
      default: () => ({
        type: 'ios-loading',
        size: 36,
        font: {
          fontSize: '18px',
        },
      }),
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  beforeDestroy() {
    this.isShow = false;
  },
  methods: {
    showModal() {
      this.isShow = true;
    },
  },
};
</script>
