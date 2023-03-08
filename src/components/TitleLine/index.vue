<template>
  <div class="sh-title-line">
    <div class="sh-title-line__text">
      <div class="sh-title-line__text--content">
        <slot name="content">
          {{ content }}
        </slot>
      </div>
      <span class="sh-title-line__text--note">
        <slot name="note"></slot>
      </span>
    </div>
    <div class="sh-title-line__controls">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="jsx">
export default {
  name: 'TitleLine',
  props: {
    content: {
      type: String,
      default: '默认标题',
    },
  },
};
</script>
