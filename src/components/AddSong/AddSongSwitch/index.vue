<template>
  <ul class="switches_root">
    <li
      class="switches_item"
      v-for="(item,index) in data"
      :key="item"
      :class="{'active':currentIndex === index}"
      @click="onItemClick(index)"
    >
      <span>{{item}} </span>
    </li>
  </ul>
</template>


<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [""];
      }
    },

    currentIndex: {
      type: Number,
      default: 0
    }
  },

  methods: {
    onItemClick(index) {
      this.$emit("switch", index);
    }
  }
};
</script>

<style lang="scss" scoped>
.switches_root {
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid $color-highlight-background;
  border-radius: 5px;
}

.switches_item {
  flex: 1;
  padding: 8px;
  text-align: center;
  font-size: $font-size-medium;
  color: $color-text-d;

  &.active {
    background: $color-highlight-background;
    color: $color-text;
  }
}
</style>
