<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="jsx">
export default {
  watch: {
    '$route.name': {
      handler(val) {
        // console.log(val);
      },
      immediate: true,
    },
  },
  mounted() {},
};
</script>

<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
}
</style>
