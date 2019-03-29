<template>
  <div class="recommend_root">
    <ScrollView
      :data="playlists"
      class="recommend_content"
      ref="scrollView"
    >
      <div class="content">
        <!-- 轮播图, 自动播放, 每张图间隔三秒 -->
        <SlideShow
          :data="recommends"
          auto
          interval="3"
        ></SlideShow>

        <!-- 热门歌单 -->
        <RecommendList
          :data="playlists"
          ref="playlists"
          @select="onPlaylistSelect"
        ></RecommendList>
      </div>
    </ScrollView>

    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import ScrollView from "components/base/ScrollView";
import RecommendList from "./RecommendList";
import SlideShow from "components/common/SlideShow";

import { getRecommends, getPlaylists } from "api/recommend.js";
import { ERR_OK } from "api/config.js";

export default {
  data() {
    return {
      recommends: [],
      playlists: []
    };
  },

  computed: {
    ...mapGetters(["sliceImgLoaded"])
  },

  watch: {
    sliceImgLoaded() {
      this.refreshScrollView();
    }
  },

  created() {
    // 获取推荐专辑列表
    this._getRecommends();
    // 获取歌单列表
    this._getPlaylists();
  },

  methods: {
    // 获取推荐专辑列表
    _getRecommends() {
      getRecommends().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },

    // 获取歌单列表
    _getPlaylists() {
      getPlaylists().then(res => {
        if (res.code === ERR_OK) {
          this.playlists = res.data.list;
        }
      });
    },

    refreshScrollView() {
      this.$refs.scrollView.refresh();
    },

    onPlaylistSelect(playlist) {
      this.setMusicListInfo({
        id: playlist.dissid,
        title: playlist.dissname,
        bgImg: playlist.imgurl
      });
      this.$router.push({
        path: `/recommend/${playlist.dissid}`
      });
    },

    ...mapActions(["setMusicListInfo"])
  },

  components: {
    RecommendList,
    ScrollView,
    SlideShow
  }
};
</script>
<style lang="scss" scoped>
.recommend_content {
  height: 100%;
  overflow: hidden;
}
</style>
