<template>
  <DialogWrap
    v-model="showModel"
    width="1280"
    :title="$attrs.title || title"
    class="sh-print-popup"
    v-bind="$attrs"
    @on-visible-change="initModal"
  >
    <Form ref="printform" :model="formData" :rules="rules" :label-width="80" @submit.native.prevent>
      <Row type="flex">
        <FormItem label="打印机" prop="name">
          <Select v-model="formData.name" placeholder="请选择打印机" style="width: 200px">
            <Option v-for="item in printList" :key="item.id" :value="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="打印份数" prop="copies">
          <Input v-model.number="formData.copies" style="width: 200px" class="sh-print-popup__copies">
            <span slot="prepend" class="sh-print-popup__copies--btn" @click="() => onClickMinus('copies')">-</span>
            <span slot="append" class="sh-print-popup__copies--btn" @click="() => onClickPlus('copies')">+</span>
          </Input>
        </FormItem>
      </Row>
    </Form>
    <div class="sh-print-popup__preview">
      <slot></slot>
    </div>

    <div slot="footer">
      <button-camp
        class="sh-print-popup__footer"
        :btns="[
          {
            class: 'alysa_btn_error',
            type: 'error',
            text: '取消',
            onClick: 'onClickCancel',
          },
          {
            class: 'alysa_btn_primary',
            type: 'primary',
            text: confirmText || '开始打印',
            loading: btnLoading,
            onClick: 'onClickConfirmBtn',
          },
        ]"
        @onClickConfirmBtn="confirmBtn"
        @onClickCancel="cancel"
      ></button-camp>
    </div>
  </DialogWrap>
</template>

<script lang="jsx">
import ButtonCamp from '@c/ButtonCamp/index.vue';
import DialogWrap from '@c/DialogWrap/index.vue';
import confirmqQuery from './mixin';

export default {
  components: {
    ButtonCamp,
    DialogWrap,
  },
  mixins: [confirmqQuery],
  data() {
    return {
      title: '打印预览',
    };
  },
};
</script>
