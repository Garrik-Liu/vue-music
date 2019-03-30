<template>
  <transition name="slide">
    <div
      class="add-song_root"
      @click.stop
    >
      <div class="app-song_wrapper">
        <!-- Header -->
        <div class="add-song_header">
          <h1 class="add-song_header_title">添加歌曲到列表</h1>
          <div
            class="add-song_header_close"
            @click="onCloseClick"
          >
            <i class="icon-close"></i>
          </div>
        </div>

        <!-- 搜索框 -->
        <div class="add-song_search-box">
          <SearchBox
            @query-change="onQueryChange"
            :outer-query="outerQuery"
            @clear="outerQuery = ''"
            placeholder="搜索歌曲"
          ></SearchBox>
        </div>

        <div
          class="add-song_history"
          v-show="!query"
        >
          <!-- 历史列表切换 -->
          <Switches
            :data="switchList"
            :currentIndex="currentSwitchIndex"
            @switch="onSwitchChange"
          ></Switches>

          <div class="list-wrapper">
            <!-- 播放历史 -->
            <div
              class="list-inner"
              v-if="currentSwitchIndex === 0"
            >
              <ScrollView
                :data="playHistory"
                ref="playHistory"
              >
                <SongList
                  @select="onSongSelect"
                  :musicList="playHistory"
                ></SongList>
              </ScrollView>
            </div>

            <!-- 搜索历史 -->
            <div
              class="list-inner"
              v-if="currentSwitchIndex === 1"
            >
              <ScrollView
                :data="searchHistory"
                ref="searchHistory"
              >
                <SearchList
                  :searches="searchHistory"
                  @select="setSearchQuery"
                  @delete="onHistoryDelete"
                ></SearchList>
              </ScrollView>
            </div>
          </div>
        </div>
        <div
          class="add-song_search-suggest"
          v-show="query"
        >
          <Suggest
            :result="searchResult"
            @song-select="_onSuggestSongSelect"
          ></Suggest>
          <TopTip ref='topTipAddSong'>添加成功</TopTip>
        </div>
      </div>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from "vuex";
import { SearchMixin } from "common/js/mixin";

import ScrollView from "components/base/ScrollView";
import TopTip from "components/common/TopTip";
import SongList from "components/common/SongList";
import Switches from "./AddSongSwitch";

export default {
  mixins: [SearchMixin],
  data() {
    return {
      currentSwitchIndex: 0,
      switchList: ["播放历史", "搜索历史"]
    };
  },

  computed: {
    ...mapGetters(["playHistory"])
  },

  methods: {
    onCloseClick() {
      this.$emit("close");
    },

    onSwitchChange(index) {
      this.currentSwitchIndex = index;
    },

    onSongSelect(songs, index) {
      this.insertSongToList(songs[index]);
    },

    _onSuggestSongSelect(e) {
      this.onSuggestSongSelect(e);
      this.$refs.topTipAddSong.show();
    },

    ...mapActions(["insertSongToList"])
  },

  components: {
    ScrollView,
    Switches,
    SongList,
    TopTip
  }
};
</script>

<style lang="scss" scoped>
.add-song_root {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  background: $color-background;

  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
}

.app-song_wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.add-song_header {
  position: relative;
  height: 44px;
  text-align: center;
}

.add-song_header_title {
  line-height: 44px;
  font-size: $font-size-large;
  color: $color-text;
}

.add-song_header_close {
  position: absolute;
  top: 0;
  right: 8px;

  .icon-close {
    display: block;
    padding: 12px;
    font-size: 20px;
    color: $color-theme;
  }
}

.add-song_search-box {
  margin: 20px;
}

.list-wrapper {
  position: absolute;
  top: 160px;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 20px 20px;

  .list-inner {
    height: 100%;
  }
}

.add-song_search-suggest {
  height: 100%;
}
</style>
