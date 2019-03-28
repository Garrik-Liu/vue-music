<template>
  <div class="music-list_root">
    <div class="music-list_header">
      <div
        class="music-list_header_bg"
        :style="topBarBgStyle"
      ></div>
      <div
        class="music-list_header_back"
        @click="back"
      >
        <i class="icon-back"></i>
      </div>
      <h1 class="music-list_header_title">{{ title }}</h1>
    </div>
    <div
      class="music-list_bg"
      :style="bgImgStyle"
    >
      <div class="filter"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 页面背景图片 URL
    bgImgUrl: {
      type: String,
      default: ""
    },
    // 歌曲数据
    songs: {
      type: Array,
      default() {
        return [];
      }
    },
    // 页面标题
    title: {
      type: String,
      default: ""
    },
    // 是否在列表上显示排名
    rank: {
      type: Boolean,
      default: false
    },
    // 顶部 Header 的透明度
    headerOpacity: {
      type: Number,
      default: 0
    }
  },

  computed: {
    bgImgStyle() {
      return `background-image:url(${this.bgImgUrl})`;
    },

    topBarBgStyle() {
      // return `opacity: ${this.topOpacity}`;
      return `opacity: 1,
      default() {
        return []
      }`;
    }
  },

  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.music-list_root {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}

.music-list_header {
  position: absolute;
  z-index: 99;
  display: flex;
  align-items: center;
  width: 100%;
}

.music-list_header_bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-background;
}

.music-list_header_back {
  display: relative;
  z-index: 99;
  .icon-back {
    display: block;
    padding: 10px;
    font-size: $font-size-large-x;
    color: $color-theme;
  }
}

.music-list_header_title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  line-height: 40px;
  font-size: $font-size-large;
  color: $color-text;
  @include no-wrap();
}

.music-list_bg {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 70%;
  transform-origin: top;
  background-size: cover;

  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.4);
  }
}
</style>
