<template>
  <div
    class="slider"
    ref="slider"
  >
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

    <SlideButtonGroup @changeSlice="changeSlice"></SlideButtonGroup>
  </div>
</template>

<script>
import SlideSlice from "./SlideSlice/index";
import SlideButtonGroup from "./SlideButtonGroup/index";

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
    SlideSlice,
    SlideButtonGroup
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
</style>
