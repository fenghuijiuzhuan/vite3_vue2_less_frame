<template>
  <div ref="vTable" class="alysa_table sh-table" style="position: relative">
    <Table
      ref="tableRef"
      class="table"
      :columns="composeColumns"
      :data="tableDataCentre"
      :width="width"
      :height="height"
      :border="border"
      :highlight-row="highlightRow"
      :row-class-name="$attrs['row-class-name']"
      :loading="$attrs.loading"
      :size="$attrs.size"
      :no-data-text="noDataText"
      :disabled-hover="$attrs['disabled-hover']"
      :show-header="$attrs['show-header']"
      @on-select-cancel="onSelectCancel"
      @on-select="onSelect"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      v-on="tableListeners"
    >
      <template v-for="column in slotsColumns" #[column.slot]="params">
        <slot :name="column.slot" v-bind="params"></slot>
      </template>
    </Table>
    <div :class="['sh-table__footer']">
      <div>
        <slot name="pageLeft"></slot>
      </div>
      <div v-if="visiblePage" ref="pageWrap" class="sh-table__footer--pages alysa_page">
        <Page
          :current="pageInfo.page"
          :page-size-opts="pageSizeOpts"
          :page-size="pageInfo.limit"
          :total="pageInfo.total"
          size="small"
          v-bind="pageOption"
          @on-change="onPageChange"
          @on-page-size-change="onPageSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="jsx">
import _ from 'lodash';
import { arrSortItem, ready, arrDeduplicate } from '@/utils';

export default {
  name: 'WTable',
  inheritAttrs: false,
  props: {
    // 默认表格配置
    width: {
      type: [Number, String],
      default: '100%',
    },
    disabledHover: Boolean,
    highlightRow: {
      type: Boolean,
      default: true,
    },
    noDataText: {
      type: String,
      default: '暂无数据',
    },
    columns: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    hasIndex: {
      type: Boolean,
      default: true,
    },
    selectionType: {
      // null：没有选择框 multCheck：多选 radio：单选
      // n：数字，多选，最多选n个
      type: [String, Number],
      default: null,
    },
    border: {
      type: Boolean,
      default: false,
    },
    isResize: Boolean,
    visiblePage: {
      type: Boolean,
      default: true,
    },
    pageInfo: {
      type: Object,
      default: () => {
        return {
          page: 1,
          limit: 10,
          total: 0,
        };
      },
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    pageOption: {
      type: Object,
      default: () => ({
        'show-elevator': true,
        'show-sizer': true,
        'show-total': true,
        transfer: true,
      }),
    },
    tableListeners: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const configColumns = function (self) {
      return function (selectionType, fixed) {
        if (selectionType === 'radio') {
          return [
            {
              title: ' ',
              width: 70,
              align: 'center',
              fixed,
              render: (h, params) => {
                return (
                  <div class="alysa_radiogroup">
                    <Radio
                      value={params.row._checked}
                      on-on-change={(e) => {
                        self.handleSelectRadio(e, params.row, params.index);
                      }}
                    ></Radio>
                  </div>
                );
              },
            },
          ];
        }
        return [
          {
            type: 'selection',
            width: 70,
            align: 'center',
            fixed,
          },
        ];
      };
    };

    const indexConfigColumns = function (self) {
      return function (fixed) {
        return [
          {
            title: '序号',
            type: 'index',
            align: 'center',
            width: 70,
            fixed,
            indexMethod: self.indexMethod,
          },
        ];
      };
    };
    return {
      configColumns: configColumns(this),
      indexConfigColumns: indexConfigColumns(this),
      d_height: this.$attrs.height ? this.$attrs.height : 200,
      pageSizeOpts: [10, 20, 50, 100, 200, 500],
      selectedIds: [],
      tableDataCentre: [],
      dataMap: new Map(),
      timer: null,
    };
  },
  computed: {
    // 最多可选
    selectionMax() {
      if (!this.selectionType) return 0;
      if (this.selectionType === 'multCheck') return Infinity;
      if (this.selectionType === 'radio') return 1;
      return this.selectionType;
    },
    configColumnFixed() {
      return this.columns.findIndex((i) => i.fixed === 'left') > -1 && 'left';
    },
    height: {
      set(val) {
        this.d_height = val;
      },
      get() {
        const val = String(this.d_height);
        if (val.indexOf('vh') > -1) {
          return document.documentElement.clientHeight * (parseInt(val) / 100);
        }
        if (val.indexOf('%') > -1) {
          return this.$el.parentElement.clientHeight * (parseInt(val) / 100);
        }
        return this.d_height;
      },
    },
    slotsColumns() {
      return this.composeColumns.filter((i) => {
        return i.slot;
      });
    },
    composeColumns() {
      return this.handleComposeColumns();
    },
    selected() {
      return this.selectedIds.map((i) => this.dataMap.get(i) || null).filter((i) => i);
    },
  },
  watch: {
    'tableData.length': function (val, oVal) {
      this.tableDataCentre = this.beforeSetTableDataCentre();
    },
    tableData: {
      deep: true,
      handler(val, oVal) {
        this.setUpdatedData(val);
        if (val.map((i) => i[this.rowKey]).join(',') !== oVal.map((i) => i[this.rowKey]).join(',')) {
          this.tableDataCentre = this.beforeSetTableDataCentre();
        }
      },
    },
  },
  created() {
    this.$root.$on('resizeTableHeight', this.resizeTableHeight);
  },
  mounted() {
    this.initData();
    if (this.isResize) {
      this.$nextTick(() => {
        ready(() => {
          this.resizeTableHeight();
        });
        window.addEventListener('resize', this.resizeTableHeight);
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeTableHeight);
    this.$root.$off('resizeTableHeight', this.resizeTableHeight);
    this.dataMap.clear();
    this.dataMap = null;
  },
  methods: {
    beforeSetTableDataCentre() {
      return _.cloneDeep(this.tableData).map((item) => {
        const rowKeyValue = item[this.rowKey];
        const index = this.selectedIds.indexOf(rowKeyValue);
        if (index > -1) {
          item._checked = true;
        } else {
          item._checked = false;
        }
        return item;
      });
    },
    setUpdatedData(data, type = 'add') {
      if (!data) {
        return this.dataMap;
      }
      if (Array.isArray(data) && !data.length) {
        return this.dataMap;
      }
      if (type === 'del' && !this.dataMap.size) {
        return this.dataMap;
      }
      if (Array.isArray(data)) {
        if (type === 'del') {
          for (const i in data) {
            if (this.dataMap.has(data[i][this.rowKey])) {
              this.dataMap.delete(data[i][this.rowKey]);
            }
          }
          return this.dataMap;
        }
        for (const i in data) {
          this.dataMap.set(data[i][this.rowKey], data[i]);
        }
        return this.dataMap;
      }
      if (!data[this.rowKey]) {
        return this.dataMap;
      }
      if (type === 'del') {
        if (this.dataMap.has(data[this.rowKey])) {
          this.dataMap.delete(data[this.rowKey]);
        }
        return this.dataMap;
      }
      this.dataMap.set(data[this.rowKey], i);
      return this.dataMap;
    },
    getWorkingData() {
      return [...this.dataMap.values()];
    },
    // 计算table高度
    resizeTableHeight() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        let pageHeight = 0;

        if (this.visiblePage) {
          pageHeight = this.$refs?.pageWrap?.getBoundingClientRect()?.height;
        }

        const top = this.$refs?.vTable?.getBoundingClientRect()?.top;
        const height =
          document.documentElement.clientHeight -
          top -
          (this.$attrs.gap || 0) -
          parseFloat(this.$style.shPadding) -
          parseFloat(this.$style.shPanelPadding) -
          pageHeight;
        this.height = height;
        clearTimeout(this.timer);
        this.timer = null;
      }, 500);
    },
    onPageChange(e) {
      this.$emit('on-page-change', e);
    },
    onPageSizeChange(e) {
      this.$emit('on-page-size-change', e);
    },
    onSelectAllCancel(selection) {
      for (let i = 0, _i = this.tableDataCentre.length; i < _i; i++) {
        const rowKeyValue = this.tableDataCentre[i][this.rowKey];
        const index = this.selectedIds.indexOf(rowKeyValue);
        if (index > -1) {
          this.selectedIds.splice(index, 1);
        }
      }
      this.onSelectionChange(selection);
    },
    onSelectAll(selection) {
      this.selectedIds = arrDeduplicate(this.selectedIds.concat(selection.map((i) => i[this.rowKey])));
      this.onSelectionChange(selection);
    },
    onSelectCancel(selection, row) {
      const index = this.selectedIds.indexOf(row[this.rowKey]);
      this.selectedIds.splice(index, 1);
      this.onSelectionChange(selection);
    },
    onSelect(selection, row) {
      this.selectedIds.push(row[this.rowKey]);
      this.onSelectionChange(selection);
    },
    onSelectionChange(e) {
      this.$emit('on-selection-change', e, this.selected);
    },
    handleSelectRadio(e, row, index) {
      this.tableDataCentre.forEach((items) => {
        if (items._checked) this.$set(items, '_checked', false);
      });
      this.$set(this.tableDataCentre[index], '_checked', true);
      this.selectedIds = [row[this.rowKey]];
      this.onSelectionChange(this.selected);
    },
    initData(selection = []) {
      this.dataMap.clear();
      this.selectedIds = selection.map((i) => i[this.rowKey]);
      this.tableDataCentre = this.beforeSetTableDataCentre();
      this.setUpdatedData([...this.tableData, ...selection]);
    },
    // 列重组
    handleComposeColumns() {
      const indexColumns = this.hasIndex ? this.indexConfigColumns(this.configColumnFixed) : [];
      const flutterColumns = !this.selectionType ? [] : this.configColumns(this.selectionType, this.configColumnFixed);
      let a_temp = [flutterColumns, indexColumns, this.columns].flat(1);
      const reSortList = a_temp.filter((item) => {
        return item.hasOwnProperty('no');
      });
      reSortList.forEach((item) => {
        const index = a_temp.findIndex((_item) => {
          return JSON.stringify(_item) === JSON.stringify(item);
        });
        a_temp = arrSortItem(a_temp, index, item.no);
      });
      return a_temp;
    },
  },
};
</script>

<style lang="less">
.tableassdfsdfadfasd {
  padding-right: @sh-padding;
  padding-left: @sh-panel-padding;
}
// 本地没有这个类名，测试环境有这个类名，并且z-index为1,会和选择器的icon的z-index起冲突
.table /deep/ .ivu-table-fixed-shadow {
  z-index: 3;
}
</style>
