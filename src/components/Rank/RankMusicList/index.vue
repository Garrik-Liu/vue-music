<template>
  <transition name="slide">
    <MusicList
      :title="title"
      :bgImgUrl="bgImgUrl"
      :rank="true"
    >
    </MusicList>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import MusicList from "components/MusicList";

import { ERR_OK } from "api/config";
import { createSong } from "common/js/song";
import { getRankData } from "api/rank";

export default {
  data() {
    return {
      title: "",
      bgImgUrl: ""
    };
  },

  computed: {
    ...mapGetters(["musicListInfo"])
  },

  activated() {
    this.title = this.musicListInfo.title;
    this.bgImgUrl = this.musicListInfo.bgImg;
    this._getRankData(this.musicListInfo.id);
  },

  beforeRouteLeave(to, from, next) {
    this.setMusicList([]);
    next();
  },

  methods: {
    // 获取排行榜数据
    _getRankData(id) {
      // 如果没有 id 则回退
      if (!id) {
        this.$router.push("/rank");
      }

      getRankData(id).then(res => {
        if (res.code === ERR_OK) {
          this.setMusicList(this.normalizeSongs(res.songlist));
        }
      });
    },

    // 将歌曲格式化为 Song 类型实例, 并组成数组返回
    normalizeSongs(list) {
      let songList = [];
      list.forEach(item => {
        let data = item.data;
        if (data.songid && data.albumid) {
          songList.push(createSong(data));
        }
      });

      return songList;
    },

    ...mapMutations({
      setMusicList: "SET_MUSICLIST"
    })
  },

  components: {
    MusicList
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 300ms;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
