<template>
    <Modal
        v-model="showModel"
        width="666"
        :closable="false"
        :mask-closable="false"
        class-name="sh-dialog"
        class="sh-dialog-wraper"

    >
        <div slot="header" class="alysa_top_title">
            <div class="text-title">{{ title }}</div>
            <img src="@/assets/imgs/portal/close.png" @click="cancel" />
        </div>
        <div class="alysa_top_con">
            <template v-if="step == 1">
                <excelTemplate :templateConfig="templateConfig"></excelTemplate>
                <div class="alysa_con_upload">
                    <div class="upload-file">
                        <div class="upload-flie-name">
                            <p v-if="fileName">{{ fileName }}</p>
                            <p v-else>点击此处</p>
                        </div>
                        <Upload
                            ref="uploadCore"
                            :action="url"
                            :headers="headers"
                            :data="checkParams"
                            :show-upload-list="false"
                            :max-size="maxSize"
                            :accept="accept"
                            :on-progress="uploadProgress"
                            :on-success="uploadSuccess"
                            :disabled="btnLoading"
                            :on-error="onError"
                            :on-exceeded-size="handleMaxSize"
                        >
                            <a :disabled="btnLoading">{{
                                fileName ? "重新上传" : "上传文件"
                            }}</a>
                        </Upload>
                    </div>
                </div>
            </template>
            <template v-else>
                <excelTest
                    :passed-data="importData.success"
                    :un-passed-data="importData.error"
                    :templateConfig="templateConfig"
                ></excelTest>
            </template>
        </div>
        <div slot="footer">
            <div
                class="alysa_top_footer"
                :style="
                    step == 2 ? 'padding-right: 20px' : 'padding-right: 30px'
                "
            >
                <div class="alysa_btn_error">
                    <Button type="error" @click="cancel" :loading="btnLoading"
                        >取消</Button
                    >
                </div>
                <div class="alysa_btn_primary">
                    <Button
                        type="primary"
                        v-if="step == 1"
                        :disabled="!isUploaded"
                        :loading="btnLoading"
                        @click="onClickNext"
                        >下一步</Button
                    >
                </div>
                <div class="alysa_btn_primary">
                    <Button type="primary" v-if="step == 2" @click="onClickLast"
                        >上一步</Button
                    >
                </div>
                <div class="alysa_btn_primary">
                    <Button
                        type="primary"
                        v-if="step == 2"
                        :disabled="isDisabledImportBtn"
                        :loading="btnLoading"
                        @click="confirmBtn"
                        >开始导入</Button
                    >
                </div>
            </div>
        </div>
    </Modal>
</template>

<script lang="jsx">
import Cookies from "js-cookie";
import excelTemplate from "./model/excel_template.vue";
import excelTest from "./model/excel_test.vue";
export default {
    components: {
        excelTemplate,
        excelTest
    },
    props: {
        url: {
            type: String,
            default: "",
            required: true
        },
        title: {
            type: String,
            default: "导入"
        },
        templateConfig: {},
        checkParams: {},
        maxSize: {
            type: Number,
            default: 1024 * 5
        },
        name: {
            type: String,
            default: "file"
        },
        accept: {
            type: String,
            default: ".xls,.xlsx"
        }
    },
    data() {
        return {
            showModel: false,
            step: 1,
            fileName: null,
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer" + Cookies.get("alysa_token")
            },
            btnLoading: false,
            isUploaded: false,
            importData: {}
        };
    },
    computed: {
        isDisabledImportBtn() {
            return this.importData?.error?.length > 0
        }
    },
    methods: {
        showModelFn() {
            this.showModel = true;
            this.btnLoading = false;
        },
        // 取消
        cancel() {
            this.step = 1;
            this.showModel = false;
            this.importData = {};
            this.fileName = null;
            this.$refs?.uploadCore?.clearFiles();
        },
        // 确认
        confirmBtn() {
            this.$emit("excelConfirmBtn", this.importData, this.setComfirmBtnLoading);
        },
        setComfirmBtnLoading(isLoading) {
            this.btnLoading = isLoading;
        },
        // 下一步
        onClickNext() {
            this.step++;
        },
        // 上一步
        onClickLast() {
            this.step--;
        },
        uploadProgress() {
            this.isUploaded = false;
            this.btnLoading = true;
        },
        uploadSuccess(res, file, fileList) {
            this.btnLoading = false;
            this.isUploaded = true;
            if(res.status != '200') {
                this.$Message.error(res.msg)
                return
            }
            this.fileName = file.name;
            this.importData = res.data;
            this.$emit("uploadSuccess", res.data);
        },
        onError(error){
            console.error(error)
            this.$Message.error("文件上传失败")
        },
        handleMaxSize(file) {
            this.$Message.warning(`文件大小不能大于${this.maxSize}kb`)
        }
    }
};
</script>

<style lang="less" scoped>
.alysa_top_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;
    padding: 0 16px 0 20px;
    font-size: var(--sh-wms-title-font-size);

    img {
        cursor: pointer;
    }
}

.alysa_top_con {
    width: 100%;
    padding: 5px 0 20px;
    overflow: hidden;

    &_item {
        margin-bottom: 10px;
    }
}

.alysa_top_footer {
    display: flex;
    justify-content: flex-end;
    padding: 0 30px 0 0;

    button {
        min-width: 84px;
        margin-left: 20px;
    }
}

.alysa_con_upload {
    padding: 18px 12px;
    margin: 0 12px;
    background-color: #dbdbdb;

    .upload-file {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: @font-size-small;

        .ivu-upload {
            margin-left: 6px;
            color: @primary-color;
        }
    }
}

.alysa_con_test {
    margin: 10px 0;
}

/deep/ .title-required {
    &::after {
        color: #f00;
        content: "*";
    }
}

/deep/ .cont-required {
    &::after {
        color: #8c8c8c;
        content: "（拥有下级类别时必填）";
    }
}

/deep/.ivu-modal-header {
    padding: 0;
    border-bottom: 1px solid @border-color-base;
}

/deep/.ivu-modal-body {
    padding: 7px 20px;
}

/deep/.ivu-modal-footer {
    padding: 0 0 20px 20px;
    border: none;
}
</style>
