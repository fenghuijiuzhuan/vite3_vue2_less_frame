<template>
    <div>
        <div class="alysa_con_box">
            <div class="alysa_con_title">
                <p>1.下载模板</p>
            </div>
            <div class="alysa_con_middle">
                <div class="alysa_btn_primary">
                    <p>下载导入模板，按以下规则填写导入数据</p>
                    <Button
                        type="primary"
                        :loading="loading"
                        @click="onClickDownload"
                        >下载导入模板</Button
                    >
                </div>
            </div>
            <div class="alysa_con_table alysa_table">
                <Table
                    :columns="columns"
                    :data="templateConfig.tableData"
                    :max-height="323"
                ></Table>
            </div>
        </div>
        <div class="alysa_con_box">
            <div class="alysa_con_title">
                <p>2.上传文件</p>
            </div>
            <div class="alysa_con_middle" style="margin: 10px 0">
                <div>
                    <p>上传需要导入的数据文件，支持xls，xlsx。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="jsx">
import { mapState } from "vuex";
import { download } from "@/api/wms/comm";
import { templateColumns } from "./config"
export default {
    props: {
        templateConfig: {},
    },
    data() {
        return {
            columns: templateColumns(this),
            loading: false,
        };
    },
    computed: {
        ...mapState({
            api: (state) => state.api,
        }),
    },
    methods: {
        async onClickDownload() {
            // window.open(this.templateConfig.fileUrl)
            let fileBlob = null;
            const url = this.templateConfig.fileUrl;
            this.loading = true;
            try {
                const res = await download({}, url);
                this.loading = false;
                if (res.status == "200") {
                    fileBlob = res.data;
                }
                if (fileBlob) {
                    this.$DownloadFile({
                        flow: fileBlob,
                        fileName: this.templateConfig.fileName,
                    });
                }
            } catch (error) {
                this.loading = false;
                this.$Message.error("下载失败");
                console.error(error);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.alysa_con_title {
    font-size: @font-size-small;
    font-weight: bold;
}

.alysa_con_middle {
    padding: 0 12px;
    font-size: @font-size-small;

    > div:first-child {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }
}

.alysa_con_table {
    padding: 0 12px;
    margin: 10px 0;
}
</style>
