<template>
  <div class="search-list">
    <ul>
      <li
        class="search-item"
        v-for="item in searches"
        :key="item"
      >
        <span class="text">{{ item }}</span>
        <span class="icon">
          <i class="icon-delete"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    searches: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.search-list {
  .search-item {
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;

    &.list-enter-active,
    &.list-leave-active {
      transition: all 0.1s;
    }

    &.list-enter,
    &.list-leave-to {
      height: 0;
    }

    .text {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-l;
    }

    .icon {
      position: relative;
      right: -5px;
      text-align: center;
      padding: 5px;
      .icon-delete {
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }
  }
}
</style>
