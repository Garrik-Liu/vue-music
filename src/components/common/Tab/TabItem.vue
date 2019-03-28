<template>
  <router-link
    tag="div"
    class="tab-item-root"
    :to="to"
  >
    <span class="tab-item-text">{{ title }}</span>
  </router-link>
</template>

<script>
export default {
  props: {
    // 导航目的地 URL
    to: {
      type: String,
      default: "/"
    },

    // 链接显示名称
    title: {
      type: String,
      default: "未知"
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-item-root {
  flex: 1 1 auto;
  text-align: center;

  &.router-link-active {
    .tab-item-text {
      color: $color-theme;
      border-bottom: 2px solid $color-theme;
    }
  }
}

.tab-item-text {
  color: $color-text-l;
  padding-bottom: 5px;
}
</style>
