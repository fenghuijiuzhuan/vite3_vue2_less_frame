<template>
    <div>
        <div class="alysa_con_tabs">
            <Tabs v-model="change">
                <TabPane :label="`通过(${passedData.length})`" name="1">
                    <div class="alysa_table">
                        <Table
                            :columns="passedColumns"
                            :data="passedDataPage"
                            :height="400"
                        ></Table>
                    </div>

                    <div class="page-wrap">
                        <span></span>
                        <Page
                            :total="passedDataTotal"
                            :current="passPage.page"
                            :page-size="passPage.size"
                            size="small"
                            show-sizer
                            show-elevator
                            transfer
                            @on-change="onPageChangePass"
                            @on-page-size-change="onPageSizeChangePass"
                        />
                    </div>
                </TabPane>
                <TabPane :label="`未通过(${unPassedData.length})`" name="2">
                    <div class="alysa_table">
                        <Table
                            :columns="unPassedColumns"
                            :data="unPassedDataPage"
                            :height="400"
                        ></Table>
                    </div>

                    <div class="page-wrap">
                        <span></span>
                        <Page
                            :total="unPassedDataTotal"
                            :current="unPassPage.page"
                            :page-size="unPassPage.size"
                            size="small"
                            show-sizer
                            show-elevator
                            transfer
                            @on-change="onPageChangeUnPass"
                            @on-page-size-change="onPageSizeChangeUnPass"
                        />
                    </div>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script lang="jsx">
import { passedColumns, unPassedColumns } from "./config";
export default {
    props: {
        passedData: {
            type: Array,
            default: () => []
        },
        unPassedData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            passedColumns: passedColumns(this),
            unPassedColumns: unPassedColumns(this),
            tab: "1",
            passPage: {
                size: 10,
                page: 1
            },
            unPassPage: {
                size: 10,
                page: 1
            }
        };
    },
    computed: {
        passedDataTotal() {
            return this.passedData.length;
        },
        unPassedDataTotal() {
            return this.unPassedData.length;
        },
        passedDataPage() {
            const { page, size } = this.passPage;
            return this.passedData.slice(
                (page - 1) * size,
                (page - 1) * size + size
            );
        },
        unPassedDataPage() {
            const { page, size } = this.unPassPage;
            return this.unPassedData.slice(
                (page - 1) * size,
                (page - 1) * size + size
            );
        },
        change: {
            get() {
                if (this.unPassedData.length) {
                    return "2";
                }
                return this.tab;
            },
            set(val) {
                this.tab = val;
            }
        }
    },
    methods: {
        changeTableDataPass() {},
        changeTableDataUnPass() {},
        onPageChangePass(e) {
            this.passPage.page = e;
            this.changeTableDataPass();
        },
        onPageSizeChangePass(e) {
            this.passPage.size = e;
            this.onPageChangePass(1);
        },
        onPageChangeUnPass(e) {
            this.unPassPage.page = e;
            this.changeTableDataUnPass();
        },
        onPageSizeChangeUnPass(e) {
            this.unPassPage.size = e;
            this.onPageChangeUnPass(1);
        }
    }
};
</script>

<style scoped lang="less">
.page-wrap {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
}
</style>
