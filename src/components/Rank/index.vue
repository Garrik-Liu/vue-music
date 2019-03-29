<template>
  <div class="rank_root">
    <Loading
      v-show="loading"
      class="loading"
    ></Loading>
    <ScrollView
      class="rank_toplist"
      :data="topList"
    >
      <ul>
        <RankItem
          class="rank_toplist_item"
          v-for="item in topList"
          :key="item.name"
          :picUrl="item.picUrl"
          :songList="item.songList"
          @click.native="onRankItemClick(item)"
        ></RankItem>
      </ul>
    </ScrollView>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { mapActions } from "vuex";

import RankItem from "./RankItem";
import ScrollView from "components/base/ScrollView";
import Loading from "components/common/Loading";

import { getTopList } from "api/rank";
import { ERR_OK } from "api/config";

export default {
  data() {
    return {
      topList: [],
      loading: true
    };
  },

  watch: {
    topList() {
      if (this.topList.length > 0) {
        this.loading = false;
      }
    }
  },

  components: {
    RankItem,
    ScrollView,
    Loading
  },

  created() {
    // 获取排行榜数据
    this._getTopList();
  },

  methods: {
    _getTopList() {
      getTopList().then(res => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList;
        }
      });
    },

    onRankItemClick(item) {
      this.setMusicListInfo({
        id: item.id,
        title: item.topTitle,
        bgImg: item.picUrl
      });
      this.$router.push(`/rank/${item.id}`);
    },

    ...mapActions(["setMusicListInfo"])
  }
};
</script>

<style lang="scss" scoped>
.loading {
  margin-top: 100px;
}

.rank_toplist_item {
  &:last-of-type {
    padding-bottom: 80px;
  }
}
</style>
