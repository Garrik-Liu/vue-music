<template>
  <div class="letter-bar_root">
    <ul>
      <li
        class="letter-bar_item"
        v-for="(item, index) in data"
        :class="{actived: index === currentIndex}"
        :key="item"
        @touchstart="onTouchStart($event, index)"
        @touchmove="onTouchmove"
        ref="letterItem"
      >
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [
          "热",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ];
      }
    },
    currentIndex: Number
  },

  methods: {
    onTouchStart(e, index) {
      this.$emit("touchstart", e, index);
    },

    onTouchmove(e) {
      let itemHeight = this.$refs.letterItem[0].offsetHeight;
      this.$emit("touchmove", e, itemHeight);
    }
  }
};
</script>

<style lang="scss" scoped>
.letter-bar_root {
  position: fixed;
  z-index: 99;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background: $color-background-d;
  font-family: Helvetica;
}

.letter-bar_item {
  padding: 3px;
  line-height: 1;
  color: $color-text-l;
  font-size: $font-size-small;

  &.actived {
    color: $color-theme;
  }
}
</style>
