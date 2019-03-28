<template>
  <div
    class="scroll-view-root"
    ref="scrollView"
  >
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    // 包含在内的列表的数据
    data: {
      type: Array,
      default() {
        return [];
      }
    },

    probeType: {
      type: Number,
      // 屏幕滑动超过一定时间后派发 scroll 事件
      default: 1
    },

    // 是否允许在滚动上点击
    click: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    // 数据变化时, 刷新组建
    data() {
      this.refresh();
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      if (!this.$refs.scrollView) {
        return;
      }

      // 创建 BScroll 实例
      this.scroll = new BScroll(this.$refs.scrollView, {
        probeType: this.probeType,
        click: this.click
      });

      // 监听滚动事件, 触发时返回滚动位置
      this.scroll.on("scroll", pos => {
        this.$emit("scroll", pos);
      });
    },

    // 当 DOM 结构发生变化时, 重新计算 better-scroll
    refresh() {
      this.scroll && this.scroll.refresh();
      this.scroll.hasVerticalScroll = true;
    },

    // 滚动到指定元素位置
    scrollToElement(target, time, offsetY) {
      this.scroll &&
        this.scroll.scrollToElement.apply(this.scroll, [
          target,
          time,
          true,
          offsetY
        ]);
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-view-root {
  height: 100%;
  overflow: hidden;
}
</style>

