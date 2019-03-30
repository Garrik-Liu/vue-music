<template>
  <div class="search">
    <div class="search-box-wrapper">
      <!-- 搜索栏 -->
      <SearchBox
        @query-change="onQueryChange"
        :outer-query="outerQuery"
        @clear="outerQuery = ''"
      ></SearchBox>
    </div>

    <!-- 搜索热点 & 搜索记录 -->
    <div
      ref="shortcutWrapper"
      class="shortcut-wrapper"
    >
      <ScrollView
        ref="shortcut"
        :data="searchHistory"
        class="shortcut"
      >
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <Loading v-show="!hotKeys.length"></Loading>
            <ul>
              <li
                class="item"
                v-for="item in hotKeys"
                :key="item.n"
                @click="setSearchQuery(item.k)"
              >
                <span>{{ item.k }}</span>
              </li>
            </ul>
          </div>
          <div class="search-history">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <SearchList
              :searches="searchHistory"
              @select="setSearchQuery"
              @delete="onHistoryDelete"
            ></SearchList>
          </div>
        </div>
      </ScrollView>
    </div>

    <!-- 搜索推荐 -->
    <div
      class="search-result"
      v-show="query"
      ref="searchResult"
    >
      <Suggest
        :result="searchResult"
        @song-select="onSuggestSongSelect"
      ></Suggest>
    </div>
  </div>
</template>
<script>
import { getHotKey } from "api/search";
import { ERR_OK } from "api/config";
import { SearchMixin } from "common/js/mixin";

import ScrollView from "components/base/ScrollView";
import Loading from "components/common/Loading";

export default {
  mixins: [SearchMixin],
  data() {
    return {
      hotKeys: []
    };
  },

  watch: {
    hotKeys() {
      setTimeout(() => {
        this.$refs.shortcut.refresh();
      }, 20);
    },

    searchHistory() {
      setTimeout(() => {
        this.$refs.shortcut.refresh();
      }, 20);
    }
  },

  created() {
    this._getHotKey();
  },

  methods: {
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKeys = res.data.hotkey.slice(0, 12);
        }
      });
    }
  },

  components: {
    ScrollView,
    Loading
  }
};
</script>

<style lang="scss" scoped>
.search {
  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
    }

    .search-history {
      position: relative;
      margin: 0 20px;

      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;

        .text {
          flex: 1;
        }
        .clear {
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
    background: $color-background;
  }
}
</style>
