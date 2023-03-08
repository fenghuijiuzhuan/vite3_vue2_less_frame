import CommonIcon from '@c/Icon/index.vue';
import { showTitle } from '@/libs/util';

export default {
  components: {
    CommonIcon,
  },
  methods: {
    showTitle(item) {
      return showTitle(item, this);
    },
    showChildren(item) {
      return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways));
    },
    getNameOrHref(item, children0) {
      const path = item.path ? `isTurnByHref_${item.path}` : children0;

      if (path) {
        return item.children[0].name;
      }
      return item.name;
    },
  },
};
