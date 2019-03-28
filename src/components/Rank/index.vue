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
          v-for="item in topList"
          :key="item.name"
          :picUrl="item.picUrl"
          :songList="item.songList"
          @click.native="onRankItemClick(item)"
        ></RankItem>
      </ul>
    </ScrollView>
    <router-view></router-view>
  </div>
</template>
<script>
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
      this.loading = false;
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
      this.$router.push(`/rank/${item.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.loading {
  margin-top: 100px;
}
</style>
