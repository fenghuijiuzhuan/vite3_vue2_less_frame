<template>
    <div ref="v-table" class="alysa_table sh-table" style="position: relative">
        <Spin v-if="loading" fix size="large">
            <Icon class="spin-icon-load" size="24" type="ios-loading"></Icon>
            <div>{{ loadingText || "" }}</div>
        </Spin>
        <Table
            ref="selection"
            v-bind="$attrs"
            v-on="$listeners"
            :columns="composeColumns"
            :data="tableDataPost"
            :height="isResize ? height : tableHeight"
            :row-class-name="rowClassName"
            highlight-row
            width="100%"
            @on-selection-change="selectionTableChange"
            @on-select-all-cancel="handleCancelSelectAll"
            @on-select-all="handleSelectAll"
            @on-select="handleSelect"
            @on-select-cancel="handleCancel"
        >
            <template v-for="column in slotsColumns" v-slot:[column.slot]="params">
                <slot :name="column.slot" v-bind="params"></slot>
            </template>
        </Table>
        <div
            :class="[
                'sh-table__footer',
                !pagePosition ? '' : pagePosition === 'left' ? 'position left' : 'position right',
            ]"
        >
            <div>
                <slot name="pageLeft"></slot>
            </div>
            <div v-if="pageInfoPost && visiblePage" ref="pageWrap" class="sh-table__footer--pages alysa_page">
                <Page
                    :current="pageInfoPost.page"
                    :page-size-opts="pageSizeArr"
                    :pageSize="pageInfoPost.limit"
                    :total="total"
                    :show-elevator="pageShowElevator"
                    :show-sizer="pageShowSizer"
                    :show-total="pageShowTotal"
                    size="small"
                    transfer
                    @on-change="onPageChange"
                    @on-page-size-change="onSizeChange"
                />
            </div>
        </div>
    </div>
</template>
<script lang="jsx">
import _ from "lodash";
import { arrSortItem, ready, debounce } from "@/utils";
import { shPagePadding, shPanelPadding } from "@/assets/theme/index.less";
const configColumns = (self) => [
    // 多选
    {
        type: "selection",
        width: 60,
        align: "center",
        key: "multCheck",
    },
    // 单选check
    {
        title: " ",
        align: "center",
        key: "singleCheck",
        width: 60,
        render: (h, params) => {
            return h("div", [
                h("Checkbox", {
                    props: {
                        value: params.row.checkBox,
                    },
                    on: {
                        "on-change": (e) => {
                            self.handleSelectOne(e, params.index);
                        },
                    },
                }),
            ]);
        },
    },
    // 单选radio
    {
        title: " ",
        type: "select",
        width: 60,
        align: "center",
        key: "radio",
        render: (h, params) => {
            return h(
                "div",
                {
                    class: "alysa_radiogroup",
                },
                [
                    h("Radio", {
                        props: {
                            value: params.row.radioBox,
                        },
                        on: {
                            "on-change": (e) => {
                                self.handleSelectRadio(e, params.index);
                            },
                        },
                    }),
                ],
            );
        },
    },
    // 序号
    {
        title: "序号",
        key: "number",
        align: "center",
        width: 60,
        render: (h, params) => {
            return h("span", Number(params.index) + 1);
        },
    },
];

export default {
    name: "WTable",
    props: {
        columns: {
            type: Array,
            default: () => [],
        },
        tableData: {
            type: Array,
            default: () => [],
        },
        tableHeight: {
            type: [Number, String],
            default: "",
        },
        pageInfo: {
            type: Object,
            default: null,
        },
        loading: Boolean,
        loadingText: {
            type: String,
            default: "数据加载中...",
        },
        rowClassName: {
            type: Function,
            default: () => {},
        },
        isNumber: {
            type: Boolean,
            default: true,
        },
        selectionType: {
            type: String | Number,
            default: null, // null 没有选择框    multCheck 多选    singleCheck 最多选一个    radio 单选
        },
        isResize: Boolean,
        gap: {
            type: Number,
            default: 0,
        },
        pagePosition: {
            type: String,
            default: "",
        },
        rowKey: {
            type: String,
            default: "id",
        },
        visiblePage: {
            type: Boolean,
            default: true,
        },
        isScrollFullView: Boolean,
        isFrontPage: Boolean,
        pageShowElevator: {
            type: Boolean,
            default: true,
        },
        pageShowSizer: {
            type: Boolean,
            default: true,
        },
        pageShowTotal: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            pageSizeArr: [10, 20, 50, 200, 500],
            selected: [], //跨页选择list
            selectionTable: [], // 当前页选择
            workingList: [], // 跨页选择
            timer: null,
            height: 200,
            composeColumns: [],
            pageInfoFront: { ...this.pageInfo },
        };
    },
    computed: {
        pageInfoPost() {
            if (this.isFrontPage) {
                return this.pageInfoFront;
            }
            return this.pageInfo;
        },
        total() {
            if (this.isFrontPage) {
                return this.tableData.length;
            }
            return this.pageInfo.total;
        },
        tableDataPost() {
            let tableData = [];
            if (this.isFrontPage && this.pageInfo) {
                const { page, limit } = this.pageInfoFront;
                const t = _.cloneDeep(this.tableData);
                tableData = t.slice((page - 1) * limit, (page - 1) * limit + limit);
                // tableData = t.splice((page - 1) * limit, page * limit);
                if (page > 1 && !tableData.length) {
                    tableData = t.splice((page - 2) * limit, page * limit);
                }
            } else {
                tableData = this.tableData || [];
            }

            tableData.forEach((item) => {
                if (this.workingList.findIndex((i) => i[this.rowKey] === item[this.rowKey]) > -1) {
                    item._checked = true;
                }
            });
            return tableData;
        },
        slotsColumns() {
            return this.composeColumns.filter((item) => {
                return item.slot;
            });
        },
        // 获取配置信息
        configColumns() {
            return configColumns(this);
        },
        current() {
            return this.pageInfoPost?.size;
        },
    },
    watch: {
        loading(val) {
            if (!val && this.isResize) {
                this.resizeTableHeight();
            }
        },
        columns: {
            immediate: true,
            handler(val) {
                this.composeColumns = _.cloneDeep(val);
                const hasFixed = this.composeColumns.findIndex((item) => item.fixed === "left") > -1;

                let flutterColumns = this.configColumns
                    .filter((item) => (this.isNumber && item.key === "number") || item.key === this.selectionType)
                    .map((item) => {
                        return {
                            ...item,
                            fixed: hasFixed && "left",
                        };
                    });
                let composeColumns = flutterColumns.concat(this.composeColumns);

                this.composeColumns = this.handleSortArr(composeColumns);
            },
        },
    },
    created() {
        this.$root.$on("resizeTableHeight", this.resizeTableHeight);
        if (this.isScrollFullView) {
            this.$_scrollFullViewHandler = debounce((args) => {
                this.onScrollFullView(args);
            }, 100);
            const el = document.querySelector(".con-nuxt");
            el.addEventListener("scroll", this.$_scrollFullViewHandler);
        }
    },
    mounted() {
        if (this.isResize) {
            this.$nextTick(() => {
                ready(() => {
                    this.resizeTableHeight();
                });
                window.addEventListener("resize", this.resizeTableHeight);
            });
        }
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.resizeTableHeight);
        this.$root.$off("resizeTableHeight", this.resizeTableHeight);
        if (this.isScrollFullView) {
            const el = document.querySelector(".con-nuxt");
            el.removeEventListener("scroll", this.$_scrollFullViewHandler);
        }
    },
    methods: {
        clearWorking() {
            this.workingList = [];
        },
        // 当对表格数据进行删除时，更新working
        // items：删除的列表
        delWorkingList(items) {
            const currentList = this.workingArea([], items, this.rowKey, this.selectionTable);
            this.selectionTableChange(currentList, items);
        },
        workingArea(nList, oList = [], key, sourceList) {
            // working是为了解决分页选中数据暂存问题
            let _working = this.$data._working;
            if (!_working) {
                _working = new Map();
                sourceList.forEach((item) => {
                    _working.set(item[key], item);
                });
            }
            if (oList.length) {
                oList.forEach((item) => {
                    let name = item[key];
                    if (_working.has(name)) {
                        _working.delete(name);
                    }
                });
            }
            if (nList.length) {
                nList.forEach((item) => {
                    _working.set(item[key], item);
                });
            }
            return [..._working.values()];
        },
        onScrollFullView(e) {
            // 页面滚动回调
            // console.log(e.target.scrollTop);
            // const top = this.$el.getBoundingClientRect().top;
            // console.log(top)
            // if (top >= 92) {
            // }
        },
        handleSortArr(arr) {
            let arr_temp = [].concat(arr);
            const reSortList = arr_temp.filter((item) => {
                return item.hasOwnProperty("no");
            });
            reSortList.forEach((item) => {
                const index = arr_temp.findIndex((_item) => {
                    return JSON.stringify(_item) === JSON.stringify(item);
                });
                arr_temp = arrSortItem(arr_temp, index, item.no);
            });
            return arr_temp;
        },
        // 计算table高度
        resizeTableHeight() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                let pageHeight = 0;

                if (this.pageInfo) {
                    pageHeight = this.$refs?.pageWrap?.getBoundingClientRect()?.height;
                }

                const top = this.$refs["v-table"]?.getBoundingClientRect()?.top;
                let height =
                    document.documentElement.clientHeight -
                    top -
                    this.gap -
                    parseFloat(shPagePadding) -
                    parseFloat(shPanelPadding) -
                    pageHeight;
                this.height = height;
                clearTimeout(this.timer);
                this.timer = null;
            }, 500);
        },
        onPageChange(e) {
            this.selectionTable = [];
            if (this.isFrontPage) {
                console.log("onPageChange front");
                return (this.pageInfoFront.page = e);
            }
            console.log("onPageChange");
            this.$emit("on-page-change", e);
        },
        onSizeChange(e) {
            this.selectionTable = [];
            if (this.isFrontPage) {
                console.log("onPageSizeChange front");
                return (this.pageInfoFront.limit = e);
            }
            console.log("onPageSizeChange");
            this.$emit("on-size-change", e);
        },
        selectionTableChange(e, o) {
            // --跨页选择--
            this.workingList = this.workingArea(e, o || this.selectionTable, this.rowKey, this.workingList);
            this.selectionTable = e;
            this.$emit("working-change", this.workingList);
            // --跨页选择优化--
            this.$emit("selection-table-change", e);
            this.$emit("on-selection-change", e);
        },
        handleCancel(selection, row) {
            this.tableData.map((x) => {
                if (row[this.rowKey] == x[this.rowKey]) {
                    x._checked = false;
                }
            });
            this.selected = this.selected.filter((x) => x.current != this.current);
            let newSelection = selection.map((x) => {
                x.current = this.current;
                return x;
            });
            this.selected = [...this.selected, ...newSelection];
            this.$emit("selection-table-change", this.selected);
            //从已选项中去除取消项
        },
        //选择
        handleSelect(selection, row) {
            selection.map((i) => {
                this.tableData.map((x) => {
                    if (i[this.rowKey] == x[this.rowKey]) {
                        x._checked = true;
                    }
                });
            });
            this.selected = this.selected.filter((x) => x.current != this.current);
            let newSelection = selection.map((x) => {
                x.current = this.current;
                return x;
            });
            this.selected = [...this.selected, ...newSelection];
            this.$emit("selection-table-change", this.selected);
            //添加到已选项
        },
        //全选当前页
        handleSelectAll(selection) {
            selection.map((i) => {
                this.tableData.map((x) => {
                    if (i[this.rowKey] == x[this.rowKey]) {
                        x._checked = true;
                    }
                });
            });
            //数组合并，有可能角色先选择了某几项，已经被我们push进去，因此数组合并需要去重一下
            this.selected = this.selected.filter((x) => x.current != this.current);
            let newSelection = selection.map((x) => {
                x.current = this.current;
                return x;
            });
            this.selected = [...this.selected, ...newSelection];
            this.$emit("selection-table-change", this.selected);
        },
        //当前页取消
        handleCancelSelectAll(selection) {
            this.tableData.map((x) => {
                x._checked = false;
            });
            this.selected = this.selected.filter((x) => x.current != this.current);
            let newSelection = selection.map((x) => {
                x.current = this.current;
                return x;
            });
            this.selected = [...this.selected, ...newSelection];
            this.$emit("selection-table-change", this.selected);
        },
        // 只能选一个
        handleSelectOne(e, index) {
            this.tableData.forEach((items) => {
                this.$set(items, "checkBox", false);
            });
            this.$set(this.tableData[index], "checkBox", e);
            this.selected = [];
            if (e) {
                this.selected.push(this.tableData[index]);
            }
            // --跨页选择--
            this.selectionTable = [];
            this.workingList = [];
            this.selectionTableChange(this.selected);
            // --跨页选择优化--
        },
        // 单选
        handleSelectRadio(e, index) {
            this.tableData.forEach((items) => {
                this.$set(items, "radioBox", false);
            });
            this.$set(this.tableData[index], "radioBox", e);
            this.selected = this.tableData[index];
            this.$emit("selection-table-change", this.selected);

            // --跨页选择--
            this.selectionTable = [];
            this.workingList = [];
            this.selectionTableChange([e]);
            // --跨页选择优化--
        },
        // 设置单选初始值
        setSigleDefaultValue() {
            this.tableData.map((x) => (x.radioBox = false));
            this.$set(this.tableData[0], "radioBox", true);
            this.selected = this.tableData[0];
            this.$emit("selection-table-change", this.selected);

            // --跨页选择--
            this.selectionTable = [];
            this.workingList = [];
            this.selectionTableChange([this.tableData[0]]);
            // --跨页选择优化--
        },
        //初始化选择-状态
        initSelected() {
            this.selected = [];
            this.$emit("selection-table-change", this.selected);
        },
    },
};
</script>
