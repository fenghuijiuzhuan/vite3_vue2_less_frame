/*
 * @path        : \nita-wms-web\pages\wms\wmp\_provide\compose\Print\popup\mixin.js
 * @message     :
 * @Author      : YvanGuo
 */
import ButtonCamp from '@c/ButtonCamp/index.vue';
import { getLodop } from '../LodopFuncs.js';

export default {
  components: {
    ButtonCamp,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    printerOption: {
      type: Object,
      default: () => ({
        copies: 1,
        name: '',
      }),
    },
  },
  model: {
    prop: 'show',
    event: 'change',
  },
  data() {
    return {
      query: null,
      tpl: 'default',
      formData: {
        ...this.printerOption,
      },
      rules: {
        name: [
          {
            required: true,
            message: '请选择打印机',
            trigger: 'change',
          },
        ],
        copies: [
          {
            type: 'number',
            message: '请选择打印份数',
            trigger: 'change',
          },
        ],
      },
      loading: true,
      btnLoading: false,
      confirmText: '开始打印',
      printList: [],
    };
  },
  computed: {
    showModel: {
      set(val) {
        this.$emit('change', val);
      },
      get() {
        return this.show;
      },
    },
    printerParams() {
      return {
        ...this.formData,
      };
    },
  },
  methods: {
    // 数量减少
    onClickMinus(typeName) {
      const count = this.formData[typeName] - 1;
      this.$set(this.formData, typeName, count > 0 ? count : 1);
    },
    // 数量添加
    onClickPlus(typeName) {
      const count = this.formData[typeName] + 1;
      this.$set(this.formData, typeName, count);
    },
    initModal(val) {
      if (!val) return;
      this.formData = {
        ...this.printerOption,
      };
      this.showModelFn();
    },
    showModelFn() {
      this.printList = [];
      let nums = null;
      const LODOP = getLodop();
      if (LODOP) {
        nums = LODOP.GET_PRINTER_COUNT();
      } else {
        console.log('%c请先安装打印插件', 'color:red');
        return;
      }
      console.log(`这是打印机总数：${nums}`);
      if (nums.length > 0) {
        this.showPrintNum = true;
      }
      for (let i = 0; i < nums; i++) {
        this.printList.push({
          name: LODOP.GET_PRINTER_NAME(i),
          id: i,
        });
      }
    },
    // 取消
    cancel() {
      this.showModel = false;
      (this.btnLoading = false), (this.confirmText = ''), this.$refs.printform.resetFields();
      this.formData = {
        ...this.printerOption,
      };
    },
    confirmBtn() {
      this.$refs.printform.validate((valid) => {
        if (valid) {
        }
        this.confirm();
      });
    },
    confirm() {
      if (!this.printerParams.name) {
        this.$Message.info('未选择打印机');
      }
      this.$emit('confirm-query', this.printerParams);
    },
  },
};
