<template>
  <div>1245566</div>
</template>

<script>
export default {
  watch: {
    $route: {
      handler(val) {
        console.log(val);
      },
      immediate: true,
    }
  }
}
</script>
