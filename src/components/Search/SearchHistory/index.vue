<template>
  <div class="search-list">

    <transition-group
      name="list"
      tag="ul"
    >
      <li
        class="search-item"
        v-for="(item, index) in searches"
        :key="item"
        @click="onHistoryClick(item)"
      >
        <span class="text">{{ item }}</span>
        <span
          class="icon"
          @click.stop="onDeleteClick(index)"
        >
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>

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
  methods: {
    onHistoryClick(item) {
      this.$emit("select", item);
    },

    onDeleteClick(index) {
      this.$emit("delete", index);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-list {
  .search-item {
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;

    &:last-of-type {
      padding-bottom: 100px;
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

  .list-enter-active,
  .list-leave-active {
    transition: all 300ms;
  }

  .list-leave-to {
    opacity: 0;
    transform: translate3d(-100px, 0, 0);
  }
}
</style>
