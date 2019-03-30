<template>
  <transition name="drop-down">
    <div
      class="top-tip"
      v-show="showFlag"
      @click.stop="hide"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { setTimeout } from "timers";
export default {
  props: {
    delay: {
      type: [Number, Boolean],
      default: 2000
    }
  },

  data() {
    return {
      showFlag: false
    };
  },

  methods: {
    show() {
      this.showFlag = true;

      if (this.delay !== false) {
        // 清除掉上一个计时器, show 方法可以会在倒计时内被多次触发
        clearTimeout(this.showTimer);

        this.showTimer = setTimeout(() => {
          this.showFlag = false;
        }, this.delay);
      }
    },

    hide() {
      this.showFlag = false;
      this.$emit("hide");
    }
  }
};
</script>

<style lang="scss">
.top-tip {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  background: $color-dialog-background;
  &.drop-down-enter-active,
  &.drop-down-leave-active {
    transition: all 300ms;
  }

  &.drop-down-enter,
  &.drop-down-leave-to {
    transform: translate3d(0, -100%, 0);
  }
}
</style>
