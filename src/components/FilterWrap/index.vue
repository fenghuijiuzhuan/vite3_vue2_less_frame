<template>
  <panel class="sh-filter-wrap" no-title>
    <div v-show="showFilter" class="sh-filter-wrap__bottom">
      <ul class="sh-filter-wrap__bottom--params">
        <slot></slot>
      </ul>
      <div class="sh-filter-wrap__bottom--btns">
        <button-camp :btns="btns" v-on="btnsEvents" />
      </div>
    </div>
  </panel>
</template>

<script lang="jsx">
import ButtonCamp from '../ButtonCamp/index.vue';
import Panel from '../Panel/index.vue';

export default {
  name: 'FilterWrap',
  components: { ButtonCamp, Panel },
  props: {
    marginBottom: {
      type: Number,
      default: 0,
    },
    btns: {
      type: Array,
      default() {
        return [
          {
            text: '确认',
            type: 'primary',
            loading: false,
            class: 'alysa_btn_primary',
            onClick: 'on-click-search',
          },
          {
            text: '重置',
            type: 'primary',
            loading: false,
            class: 'alysa_btn_primary_ghost',
            ghost: true,
            onClick: 'on-click-reset',
          },
        ];
      },
    },
    searchValue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showFilter: true,
    };
  },
  computed: {
    btnsEvents() {
      return this.handleFilterArrItems(this.btns);
    },
    searchValueStr() {
      return this.searchValue.filter((i) => i).join('/');
    },
  },
  methods: {
    handleFilterArrItems(data, eventobj = {}) {
      return data.reduce((tal, cur) => {
        if (Array.isArray(cur)) {
          tal = {
            ...this.handleFilterArrItems(item, tal),
          };
        } else {
          const { onClick } = cur;
          if (['on-click-search', 'onClickSearch'].includes(onClick)) {
            tal[onClick] = this.onClickSearch;
          } else if (['on-click-reset', 'onClickReset'].includes(onClick)) {
            tal[onClick] = this.onClickReset;
          } else if (!tal[onClick]) {
            tal[onClick] = (callback) => {
              this.$emit(onClick, callback);
            };
          }
        }
        return tal;
      }, eventobj);
    },
    onClickSearch() {
      this.$emit('on-click-search', ...arguments);
    },
    onClickReset() {
      this.$emit('on-click-reset', ...arguments);
    },
    onClickToggleFilter() {
      this.showFilter = !this.showFilter;
      this.$nextTick(() => {
        this.$root.$emit('resizeTableHeight');
      });
    },
  },
};
</script>
