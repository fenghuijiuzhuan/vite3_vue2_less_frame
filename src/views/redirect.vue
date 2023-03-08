<script lang="jsx">
export default {
  created() {
    const { params } = this.$route;
    if (params && (params.name || params.path)) {
      this.$router.replace(params);
    } else {
      this.$router.replace({ name: 'Wms' });
    }
  },
  render(h) {
    return h(); // avoid warning message
  },
};
</script>
