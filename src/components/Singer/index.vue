<template>
  <div>
    <SingerList
      :data="singerList"
      @select="onSingerSelect"
    ></SingerList>

    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
  </div>
</template>
<script>
import { mapActions } from "vuex";

import SingerList from "./SingerList";

import SingerClass from "common/js/singer";
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";

export default {
  data: function() {
    return {
      singerList: []
    };
  },

  created() {
    this._getSingerList();
  },

  methods: {
    // 歌手被点击
    onSingerSelect(singer) {
      this.setMusicListInfo({
        id: singer.id,
        title: singer.name,
        bgImg: singer.avatar
      });

      this.$router.push({
        path: `/singer/${singer.id}`
      });
    },

    // 获取歌手列表
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singerList = this.normalizeSinger(res.data.list);
        }
      });
    },

    // 歌手列表排序
    normalizeSinger(data, options) {
      let _options = Object.assign(
        {
          hotLength: 10
        },
        options
      );

      let list = {
        hot: {
          title: "热门",
          items: []
        }
      };

      let sortedList = [];

      // 创建歌手列表
      data.forEach((item, index) => {
        const Key = item.Findex;

        // 创建 "热门组"
        if (index < _options.hotLength) {
          list.hot.items.push(
            new SingerClass({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }

        // 初始化 "字母组"
        if (!list[Key]) {
          list[Key] = {
            title: Key,
            items: []
          };
        }

        list[Key].items.push(
          new SingerClass({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });

      // 歌手列表排序 (A-Z)
      for (let key in list) {
        let subList = list[key];

        if (subList.title.match(/[a-zA-z]/)) {
          sortedList.push(subList);
        }
      }

      sortedList.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });

      sortedList.unshift(list.hot);

      return sortedList;
    },

    ...mapActions(["setMusicListInfo"])
  },

  components: {
    SingerList
  }
};
</script>

<style lang="scss" scoped>
</style>
