<template>
  <transition name="slide">
    <div
      class="add-song_root"
      @click.stop
    >
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
          <div
            class="list-inner"
            v-if="currentSwitchIndex === 0"
          >
            <ScrollView :data="playHistory">
              <SongList
                @select="onSongSelect"
                :musicList="playHistory"
              ></SongList>
            </ScrollView>
          </div>
          <div
            class="list-inner"
            v-if="currentSwitchIndex === 1"
          >
            <SearchList
              :searches="searchHistory"
              @select="setSearchQuery"
              @delete="onHistoryDelete"
            ></SearchList>
          </div>
        </div>
      </div>
      <div
        class="add-song_search-suggest"
        v-show="query"
      >
        <SearchSuggest
          :result="searchResult"
          @song-select="onSuggestSongSelect"
        ></SearchSuggest>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from "vuex";
import { SearchMixin } from "common/js/mixin";

import ScrollView from "components/base/ScrollView";
import SongList from "components/common/SongList";
import SearchBox from "components/Search/SearchBox";
import SearchSuggest from "components/Search/SearchSuggest";
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

    ...mapActions(["insertSongToList"])
  },

  components: {
    ScrollView,
    SearchBox,
    SearchSuggest,
    Switches,
    SongList
  }
};
</script>

<style lang="scss" scoped>
.add-song_root {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
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

.add-song_history {
  .list-wrapper {
    padding: 20px 30px;
  }
}
</style>
