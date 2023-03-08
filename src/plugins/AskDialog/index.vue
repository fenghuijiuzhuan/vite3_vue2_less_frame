<template>
    <wms-dialog-wrap
        v-model="isShow"
        :width="'430px'"
        class="sh-ask-dialog"
        @on-cancel="cancelBtn"
        @on-ok="confirmBtn"
    >
        <div class="sh-ask-dialog__header" slot="header">
            <img
                v-if="askModal.delDialogIcon === 'success'"
                src="@/assets/imgs/success_toast.png"
            />
            <img
                v-if="askModal.delDialogIcon === 'warning'"
                src="@/assets/imgs/warning_toast.png"
            />
            <img v-else src="@/assets/imgs/err_toast.png" />
            <div class="sh-ask-dialog__header--title">
                {{
                    (askModal.delDialogMsg && askModal.delDialogMsg.title) || ""
                }}
            </div>
        </div>
        <div class="sh-ask-dialog__content">
            <div
                v-for="(item, index) in contentList"
                :key="index"
                class="sh-ask-dialog__content--row"
            >
                {{ item }}
            </div>
        </div>
        <!-- <div class="sh-ask-dialog__footer" slot="footer">
            <div class="sh-ask-dialog__footer--btn alysa_btn_error">
                <Button type="error" @click="cancel">取消</Button>
            </div>
            <div class="sh-ask-dialog__footer--btn alysa_btn_primary">
                <Button
                    type="primary"
                    :loading="btnLoading"
                    @click="confirmBtn"
                    >确认</Button
                >
            </div>
        </div> -->
    </wms-dialog-wrap>
</template>

<script lang="jsx">
import WmsButtonCamp from "@c/ButtonCamp/index.vue";
export default {
    name: "AskDialog",
    components: {
        WmsButtonCamp,
    },
    data() {
        return {
            isShow: false,
            askModal: {},
        };
    },
    computed: {
        contentList() {
            const content =
                (this.askModal.delDialogMsg &&
                    this.askModal.delDialogMsg.content) ||
                "";
            return content.split("|_p_|");
        },
    },
    methods: {
        showModalFn(msg) {
            this.isShow = true;
            this.askModal = msg;
        },
        cancelBtn(callback) {
            this.isShow = false;
            callback && callback("loading", false, 1);
        },
        confirmBtn(callback) {
            callback && callback("loading", true);
        },
    },
};
</script>
