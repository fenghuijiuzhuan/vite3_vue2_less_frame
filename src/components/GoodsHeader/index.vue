<template>
  <div v-show="false" class="sh-goods-header sh-page__stone">
    <div>{{ title }}</div>
    <div v-if="isAction" class="sh-goods-header__btns">
      <span
        class="alysa_btn_color"
        :style="{
          color: $has(['add', '']) ? '#ccc' : '',
          cursor: $has(['add', '']) ? 'not-allowed' : 'pointer',
        }"
        @click="onClickImport"
      >
        <Icon type="ios-download-outline" size="18" />导入
      </span>
      <span
        class="alysa_btn_color"
        :style="{
          color: $has(['export', '']) ? '#ccc' : '',
          cursor: $has(['export', '']) ? 'not-allowed' : 'pointer',
        }"
        @click="onClickExport"
      >
        <Icon type="ios-cloud-download-outline" size="18" />导出
      </span>
    </div>
    <div v-if="isClose" class="sh-goods-header__close">
      <div class="alysa_btn_color" @click="closePage()">
        <span>返回</span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="jsx">
export default {
  name: 'GoodsHeader',
  props: {
    title: {}, // top的标题
    isAction: {}, // 是否显示导入导出按钮
    isClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      closeType: 1,
    };
  },
  methods: {
    // 导出
    onClickExport() {
      if (this.$has(['export', ''])) return;
      this.$emit('onClickExport');
    },
    // 导入
    onClickImport() {
      if (this.$has(['add', ''])) return;
      this.$emit('onClickImport');
    },
    // 关闭
    closePage() {
      if (this.$store.state.changeAddForm) {
        return this.$Message.error('请先保存或取消设置再进行操作');
      }
      this.$emit('close-page');
      this.closeType = 1;
    },
    // 鼠标移入
    mouseHover() {
      this.closeType = 2;
    },
    // 鼠标移出
    mouseLeave() {
      this.closeType = 1;
    },
  },
};
</script>
