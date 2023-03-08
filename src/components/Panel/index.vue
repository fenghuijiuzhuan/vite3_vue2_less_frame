<template>
  <div class="sh-panel" :style="{ marginBottom: marginBottom + 'px' }">
    <div class="sh-panel__toper">
      <slot name="toper"></slot>
    </div>
    <Card v-if="!isToper" :bordered="false">
      <template v-if="!noTitle">
        <div slot="title" class="sh-panel__head">
          <slot name="title">
            <title-line v-if="title" :content="title" />
            <title-line v-else />
          </slot>
        </div>
      </template>
      <div class="sh-panel__body">
        <slot></slot>
      </div>
    </Card>
  </div>
</template>

<script lang="jsx">
import TitleLine from '../TitleLine/index.vue';

export default {
  name: 'Panel',
  components: {
    TitleLine,
  },
  inheritAttrs: false,
  props: {
    isToper: Boolean,
    noTitle: Boolean,
    title: {
      type: String,
      default: '',
    },
    marginBottom: {
      type: Number,
      default: 0,
    },
  },
};
</script>
