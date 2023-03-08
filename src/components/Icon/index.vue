<template>
  <component :is="iconType" :type="iconName" :color="iconColor" :size="IconSize" />
</template>

<script lang="jsx">
import Iconfont from './Iconfont.vue';

export default {
  name: 'CommonIcon',
  components: { Iconfont },
  props: {
    type: {
      type: String,
      required: true,
      default: '',
    },
    color: String,
    size: Number,
  },
  computed: {
    iconType() {
      return this.type.indexOf('_') === 0 ? 'Iconfont' : 'Icon';
    },
    iconName() {
      return this.iconType === 'Iconfont' ? this.getCustomIconName(this.type) : this.type;
    },
    IconSize() {
      return this.size || (this.iconType === 'Iconfont' ? 12 : undefined);
    },
    iconColor() {
      return this.color || '';
    },
  },
  methods: {
    getCustomIconName(iconName) {
      return iconName.slice(1);
    },
  },
};
</script>

<style></style>
