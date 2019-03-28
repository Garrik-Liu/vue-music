<template>
  <div class="tab-root">
    <TabItem
      v-for="(item, index) in tabs"
      :key="index"
      :to="item.url"
      :title="item.title"
    ></TabItem>
  </div>
</template>

<script>
import TabItem from "./TabItem";

export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  components: {
    TabItem
  }
};
</script>

<style lang="scss" scoped>
$tab-height: 44px;

.tab-root {
  display: flex;
  height: $tab-height;
  line-height: $tab-height;
  font-size: $font-size-medium;
}
</style>
