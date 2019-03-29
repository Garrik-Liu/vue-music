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
import { getPlaylistSongs } from "api/recommend";

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
    this._getPlaylistSongs(this.musicListInfo.id);
  },

  beforeRouteLeave(to, from, next) {
    this.setMusicList([]);
    next();
  },

  methods: {
    // 获取推荐歌单数据
    _getPlaylistSongs(id) {
      if (!id) {
        this.$router.push("/recommend");
      }

      getPlaylistSongs(id).then(res => {
        if (res.code === ERR_OK) {
          this.setMusicList(this.normalizeSongs(res.cdlist[0].songlist));
        }
      });
    },

    normalizeSongs(list) {
      let songList = [];
      list.forEach(item => {
        if (item.songid && item.albumid) {
          songList.push(createSong(item));
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
