<template>
  <transition name="slide">
    <MusicList
      :title="title"
      :bgImgUrl="bgImgUrl"
    >
    </MusicList>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import MusicList from "components/common/MusicList";

import { ERR_OK } from "api/config";
import { createSong } from "common/js/song";
import { getSingerDetail } from "api/singer";

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
    this._getSingerDetail(this.musicListInfo.id);
  },

  beforeRouteLeave(to, from, next) {
    this.setMusicList([]);
    next();
  },

  methods: {
    // 获取歌手数据
    _getSingerDetail(id) {
      // 如果没有 id 则回退
      if (!id) {
        this.$router.push("/singer");
      }

      getSingerDetail(id).then(res => {
        if (res.code === ERR_OK) {
          this.setMusicList(this.normalizeSongs(res.data.list));
        }
      });
    },

    // 将歌曲格式化为 Song 类型实例, 并组成数组返回
    normalizeSongs(list) {
      let songList = [];
      list.forEach(item => {
        let data = item.musicData;
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
