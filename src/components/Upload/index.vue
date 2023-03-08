<template>
    <dialog-wrap
        v-model="isShow"
        width="800"
        :title="title"
        @on-close="onClose"
        class="sh-upload"
    >
        <file-upload
            ref="upload"
            v-model="files"
            :name="name"
            v-bind="uploadConfig"
            @input="handleInput"
            @input-file="handleInputFile"
            @input-filter="handleInputFilter"
            style=" display: block;width: 0; height: 0; overflow: hidden"
        >
        </file-upload>

        <label :for="name" style="padding: 20px 0" v-if="uploadConfig.drop">
            <Icon
                type="ios-cloud-upload"
                size="52"
                style="color: #39f"
            ></Icon>
            <p>点击 或 拖拽到此处上传</p>
        </label>
        <div class="sh-upload__list">
            <w-table
                :columns="tableColumns"
                :tableData="files"
                isFrontPage
                :pageInfo="{
                    page: 1,
                    limit: 10,
                }"
            ></w-table>
        </div>
        <div slot="footer" class="sh-upload__footer">
            <div>
                <div
                    class="alysa_btn_primary"
                    style=" position: relative;display: inline-block"
                >
                    <Button type="primary" :disabled="isPending">
                        选择文件
                    </Button>
                    <label
                        :for="name"
                        :disabled="isPending"
                        style="
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            margin: auto;
                            cursor: pointer;
                        "
                    ></label>
                </div>
                <button-camp
                    :btns="[
                        {
                            disabled: isEmpty || isPending,
                            class: 'alysa_btn_primary',
                            type: 'primary',
                            text: '清空文件',
                            onClick: 'on-click-clear',
                        },
                    ]"
                    @on-click-clear="onClickClear"
                ></button-camp>
            </div>
            <button-camp
                :btns="[
                    {
                        disabled: isEmpty || !isPending,
                        class: 'alysa_btn_error',
                        type: 'error',
                        text: '停止上传',
                        onClick: 'on-click-stop',
                    },
                    {
                        disabled: isEmpty || isPending || isUploaded,
                        class: 'alysa_btn_primary',
                        type: 'primary',
                        text:
                            !isEmpty && isPending ? '正在上传...' : '开始上传',
                        onClick: 'on-click-upload',
                    },
                ]"
                @on-click-stop="onClickStop"
                @on-click-upload="onClickUpload"
            ></button-camp>
        </div>
        <input type="check" :value="show" style="display: none" />
    </dialog-wrap>
</template>

<script lang="jsx">
import DialogWrap from "../DialogWrap";
import ButtonCamp from "../ButtonCamp";
import WTable from "../WTable";
import FileUpload from "vue-upload-component/dist/vue-upload-component.part.js";
const tableColumns = (self) => [
    {
        title: "文件名",
        key: "name",
    },
    {
        title: "大小",
        key: "size",
        render: (h, params) => {
            return <span>{self.toSize(params.row.size)}</span>;
        },
    },
    {
        title: "进度",
        key: "progress",
        render: (h, params) => {
            return <Progress percent={parseInt(params.row.progress)} />;
        },
    },
    {
        title: "状态",
        key: "success",
        render: (h, params) => {
            const { name, type } = self.toStatus(params.row);
            let style = "color: skyblue";
            if (type === "success") {
                style = "color: green";
            } else if (type === "error") {
                style = "color: red";
            }
            return <span style={style}>{name}</span>;
        },
    },
    {
        title: "操作",
        width: 180,
        render: (h, params) => {
            return (
                <WmsButtonCamp
                    btns={[
                        {
                            hide: !/image\/.+/.test(params.row.type),
                            class: "alysa_btn_primary",
                            type: "text",
                            size: "small",
                            text: "预览",
                            onClick: "on-click-item-preview",
                        },
                        {
                            disabled: params.row.active,
                            class: params.row.active
                                ? "alysa_btn_error"
                                : "alysa_btn_primary",
                            type: "text",
                            size: "small",
                            text: params.row.active ? "正在上传" : "上传",
                            onClick: "on-click-item-upload",
                        },
                        {
                            disabled: params.row.active,
                            class: "alysa_btn_primary",
                            type: "text",
                            size: "small",
                            text: "移除",
                            onClick: "on-click-item-remove",
                        },
                    ]}
                    on-on-click-item-preview={(callback) =>
                        self.onClickItemPreview(
                            params.row,
                            params.index,
                            callback
                        )
                    }
                    on-on-click-item-upload={(callback) =>
                        self.onClickItemUpload(
                            params.row,
                            params.index,
                            callback
                        )
                    }
                    on-on-click-item-remove={(callback) =>
                        self.onClickItemRemove(
                            params.row,
                            params.index,
                            callback
                        )
                    }
                ></WmsButtonCamp>
            );
        },
    },
];

export default {
    components: {
        DialogWrap,
        WTable,
        ButtonCamp,
        FileUpload,
    },
    model: {
        prop: "show",
        event: "on-change",
    },
    props: {
        show: Boolean,
        title: {
            type: String,
            default: "文件上传",
        },
        name: {
            type: String,
            default: "file",
        },
    },
    data() {
        return {
            config: {
                postAction: "",
                size: 1024 * 1024 * 500,
                multiple: false,
                chunkEnabled: false,
                chunk: {
                    action: "/upload/chunk",
                    minSize: 1 * 1048576,
                    maxActive: 3,
                    maxRetries: 5,
                },
                data: {
                    pageRoute: "/",
                },
            },
            files: [],
            tableColumns: tableColumns(this),
        };
    },
    computed: {
        isEmpty() {
            return !this.files.length;
        },
        isUploaded() {
            return this.$refs?.upload?.uploaded || false;
        },
        isDisabledUpload() {
            return this.isPending;
        },
        isPending() {
            return this.files.findIndex((file) => file.active) > -1;
        },
        uploadConfig() {
            const keys = Object.keys(this.$props);
            const attrs = Object.keys(this.$attrs).reduce((tal, key) => {
                if (keys.includes(key)) {
                    return tal;
                }
                tal[key] = this.$attrs[key];
                return tal;
            }, {});
            return Object.assign({}, this.config, attrs);
        },
        isShow: {
            get() {
                return this.show;
            },
            set(val) {
                this.$emit("on-change", val);
            },
        },
    },
    methods: {
        handleInput(value) {
            // this.files = value;
        },
        handleInputFile(newFile, oldFile) {},
        handleInputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                if (
                    this.files.findIndex((file) => {
                        return (
                            file.name === newFile.name &&
                            file.size === newFile.size
                        );
                    }) > -1
                ) {
                    this.$Message.error(`文件#${newFile.name}#已添加`);
                    return prevent();
                }
            }
        },
        onClickItemPreview(row, index, callback) {
            const vm = this
            const url = window.URL.createObjectURL(row.file)
            vm.$PhotosPreview({
                images: [
                    url
                ]
            })
        },
        onClickItemUpload(row, index, callback) {
            this.$refs.upload.update(row, { active: true });
        },
        onClickItemRemove(row, index, callback) {
            this.$refs.upload.remove(row);
        },
        onClose() {
            this.isShow = false;
            this.$refs.upload.clear();
            this.$emit("on-confirm");
            this.$emit("on-close");
        },
        onClickClear(callback) {
            this.$refs.upload.clear();
        },
        onClickStop() {
            this.$refs.upload.active = false;
        },
        onClickUpload() {
            this.$refs.upload.active = true;
        },
        toStatus({ success, error, response }) {
            let name, type;
            if (!success && !error) {
                name = "待上传";
            } else if (error) {
                type = "error";
                let t = error;
                switch (error) {
                    case "size":
                        t = "文件大小超出限制";
                        break;
                    case "extension":
                        t = "不允许的后缀名";
                        break;
                    case "timeout":
                        t = "超时";
                        break;
                    case "abort":
                        t = "中止";
                        break;
                    case "network":
                        t = "网络异常";
                        break;
                    case "server":
                        t = "服务器错误";
                        break;
                    case "denied":
                        t = "拒绝";
                        break;
                }
                name = t;
            } else if (response.status) {
                name = response.msg;
                type = response.status !== "200" ? "error" : "success";
            } else if (success) {
                name = "已上传";
                type = "success";
            }
            return {
                name,
                type,
            };
        },
        toSize(val) {
            let a = 0;
            if (1024 < val && val < 1048576) {
                return (a = (val / 1024).toFixed(2) + "KB");
            } else if (val > 1048576) {
                return (a = (val / 1048576).toFixed(2) + "MB");
            } else {
                return val + "B";
            }
        },
    },
};
</script>
