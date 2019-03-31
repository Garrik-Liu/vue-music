<template>
  <div
    class="slider"
    ref="slider"
  >
    <div
      class="button prev"
      @click="changeSlice(-1)"
    >
      <i>&#60;</i>
    </div>
    <div
      class="button next"
      @click="changeSlice(1)"
    >
      <i>&#62;</i>
    </div>
    <div
      class="slider__sliceGroup"
      ref="sliceGroup"
    >
      <SlideSlice
        v-for="sliceData in data"
        :key="sliceData.linkUrl"
        :data="sliceData"
      ></SlideSlice>
    </div>
  </div>
</template>

<script>
import SlideSlice from "./SlideSlice/index";

import { setSliderWidth, changeSlice, autoShow } from "./methods.js";

export default {
  props: {
    // [数据]:整个轮播组件
    data: Array,
    auto: {
      type: Boolean,
      default: false
    },
    interval: {
      type: [Number, String],
      default: 2
    }
  },

  data: function() {
    return {
      // [数据]:设备屏幕宽度
      clientWidth: document.body.clientWidth
    };
  },

  mounted() {
    // [设置]:轮播组件宽度
    this.setSliderWidth();
    // [设置]:自动播放
    this.autoShow();
  },

  destroyed() {
    clearInterval(this.autoShowTimer);
  },

  methods: {
    // [设置]:轮播组件宽度
    setSliderWidth,
    // [设置]:自动播放
    autoShow,
    // [事件处理]:切换当前轮播图
    changeSlice
  },

  components: {
    SlideSlice
  }
};
</script>

<style lang="scss" scoped>
.slider {
  overflow: hidden;
  position: relative;
}

.slider__sliceGroup {
  display: flex;
  position: relative;
}

.button {
  position: absolute;
  z-index: 99;
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 200ms ease-in-out;

  &:hover {
    background-color: #000;
    opacity: 0.5;
  }

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }
}
</style>
