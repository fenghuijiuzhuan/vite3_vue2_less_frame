<template>
  <div>
    <keep-alive>
      <component
        :is="currentName"
        ref="printPopup"
        v-model="show"
        :title="title"
        v-bind="printOptions"
        :transfer="false"
        :closable="false"
        :footer-hide="false"
        :mask-closable="false"
        @confirm-query="confirmBtn"
      >
        <template v-if="show">
          <component
            :is="tplName"
            v-bind="printOptions"
            ref="printTemplate"
            @onPrintLoading="onPrintLoading"
            @onPrintFinish="onPrintFinish"
          ></component>
        </template>
      </component>
    </keep-alive>
  </div>
</template>

<script lang="jsx">
/**
 * printWay
 * 1、需要预览 -> 静默打印
 * 2、无需预览 -> 选择打印机 -> 静默打印
 */

export default {
  name: 'PrintControl',
  data() {
    return {
      title: '',
      printWay: 'PriviewPrint',
      show: false,
      tpl: 'test', // 默认打印模板
      printOptions: {
        // printData: [[{}]]
      },
    };
  },
  computed: {
    currentName() {
      const component = () => import(`../popup/${this.printWay}.vue`);
      return component;
    },
    tplName() {
      const filename = this.tpl;
      const component = () => import(`../template/${filename}.vue`);
      return component;
    },
  },
  watch: {
    show(v) {
      !v && this.cancel();
    },
  },
  mounted() {},
  methods: {
    showModal() {
      this.$nextTick(() => {
        this.show = true;
      });
    },
    cancel() {
      this.$refs.printPopup.btnLoading = false;
      this.$refs.printPopup.confirmText = '开始打印';
    },
    confirmBtn(printerParams) {
      this.$refs.printPopup.btnLoading = true;
      this.$refs.printTemplate.onOk(printerParams);
    },
    // 打印中
    onPrintLoading() {
      console.log('打印中。。。');
      this.$refs.printPopup.confirmText = '打印中';
    },
    // 打印结束
    onPrintFinish(val) {
      this.$refs.printPopup.btnLoading = false;
      this.$refs.printPopup.confirmText = '';
      if (val == '1') {
        console.log('打印成功');
        this.$Message.success('打印成功');
      } else {
        console.log('打印失败！！！');
        this.$Message.info('打印失败，请检查打印机是否正常就绪!');
      }
    },
  },
};
</script>
