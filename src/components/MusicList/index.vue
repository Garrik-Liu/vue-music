<template>
  <div class="music-list_root">
    <!-- Header 头部 -->
    <div class="music-list_header">
      <div
        class="music-list_header_bg"
        :style="headerOpacityStyle"
      ></div>
      <!-- 返回按钮 -->
      <div
        class="music-list_header_back"
        @click="back"
      >
        <i class="icon-back"></i>
      </div>
      <h1 class="music-list_header_title">{{ title }}</h1>
    </div>

    <!-- 页面背景图 -->
    <div
      class="music-list_bg"
      :style="bgImgStyle"
    >
      <div class="filter"></div>
    </div>

    <!-- 歌曲列表 -->
    <ScrollView
      class="music-list_scroll"
      :data="musicList"
      :probeType="probeType"
      @scroll="onMusicListScroll"
      ref="musicList"
    >
      <SongList
        @select="onSongSelect"
        :musicList="musicList"
        :rank="rank"
      ></SongList>
      <Loading
        v-show="loading"
        class="loading"
      ></Loading>
    </ScrollView>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ScrollView from "components/base/ScrollView";
import Loading from "components/common/Loading";
import SongList from "components/common/SongList";

import { calScrollToTopPercent } from "common/js/utils";

export default {
  data() {
    return {
      loading: true,
      probeType: 3,
      headerOpacity: 0
    };
  },

  props: {
    // 页面背景图片 URL
    bgImgUrl: {
      type: String,
      default: ""
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
    }
  },

  created() {
    // 歌单组件距离顶部距离
    this.musicListTop = undefined;
  },

  updated() {
    this.musicListTop = this.$refs.musicList.$el.offsetTop;
  },

  computed: {
    // 页面背景图
    bgImgStyle() {
      return `background-image:url(${this.bgImgUrl})`;
    },

    // 顶部 Header 透明度
    headerOpacityStyle() {
      return `opacity: ${this.headerOpacity}`;
    },

    ...mapGetters(["musicList"])
  },

  methods: {
    // 回退到上一页面
    back() {
      this.$router.back();
    },

    // 播放选择歌曲
    onSongSelect(songs, index) {
      this.initPlayer({ songs, index });
    },

    // 当歌曲列表 Scroll 滚动, 计算 Header 透明度
    onMusicListScroll(pos) {
      this.headerOpacity = calScrollToTopPercent(pos, this.musicListTop);
    },

    ...mapActions(["initPlayer"])
  },

  components: {
    ScrollView,
    Loading,
    SongList
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

.music-list_scroll {
  overflow: visible;
}

.loading {
  margin-top: 100px;
}
</style>
