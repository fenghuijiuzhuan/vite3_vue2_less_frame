<template>
    <Modal
        v-model="showModel"
        width="430"
        v-bind="$attrs"
        @on-visible-change="initModal"
        class="sh-print-popup"
    >
        <div slot="header" class="sh-print-popup__header">
            <div class="text-title">请选择打印机</div>
            <img src="@/assets/imgs/portal/close.png" @click="cancel()" />
        </div>
        <Form
            ref="printform"
            :model="formData"
            :rules="rules"
            :label-width="80"
            @submit.native.prevent
        >
            <FormItem label="打印机" prop="name">
                <Select v-model="formData.name" placeholder="请选择打印机">
                    <Option
                        v-for="item in printList"
                        :value="item.name"
                        :key="item.id"
                        >{{ item.name }}</Option
                    >
                </Select>
            </FormItem>
            <FormItem label="打印份数" prop="copies">
                <Input
                    style="width: 200px"
                    class="sh-print-popup__copies"
                    v-model.number="formData.copies"
                >
                    <span
                        class="sh-print-popup__copies--btn"
                        @click="() => onClickMinus('copies')"
                        slot="prepend"
                        >-</span
                    >
                    <span
                        class="sh-print-popup__copies--btn"
                        @click="() => onClickPlus('copies')"
                        slot="append"
                        >+</span
                    >
                </Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <button-camp
                class="sh-print-popup__footer"
                :btns="[
                    {
                        class: 'alysa_btn_error',
                        type: 'error',
                        text: '取消',
                        onClick: 'cancel',
                    },
                    {
                        class: 'alysa_btn_primary',
                        type: 'primary',
                        text: confirmText || '开始打印',
                        loading: false,
                        onClick: 'confirmBtn',
                    },
                ]"
                @on-click-confirm-btn="confirmBtn"
                @on-click-cancel="cancel"
            ></button-camp>
        </div>
        <div v-show="false" class="sh-print-popup__preview">
            <slot></slot>
        </div>
    </Modal>
</template>

<script lang="jsx">
import confirmqQuery from "./mixin";
import ButtonCamp from "@c/ButtonCamp/index.vue";
export default {
    mixins: [confirmqQuery],
    components: {
        ButtonCamp,
    },
};
</script>
