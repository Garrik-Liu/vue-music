<template>
  <div class="slider__slice">
    <a
      class="link"
      :href="data.linkUrl"
      target="_blank"
    >
      <img
        class="img"
        :src="data.picUrl"
        ref="sliceImg"
        @load="onImgLoaded"
      >
    </a>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    // [数据]:单个轮播图
    data: Object
  },

  mounted() {
    this.setSliceWidth();
  },

  methods: {
    // [设置]:轮播图宽度 = 页面宽度
    setSliceWidth() {
      this.$refs.sliceImg.style.width = document.body.clientWidth + "px";
    },

    ...mapMutations({
      onImgLoaded: "ON_IMG_LOADED"
    })
  }
};
</script>

<style lang="scss" scoped>
</style>
