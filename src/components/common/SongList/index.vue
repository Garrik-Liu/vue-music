<template>
  <ul class="music-list_list">
    <SongListItem
      v-for="(song, index) in musicList"
      :key="song.id"
      :index="index"
      :rank="rank"
      :name="song.name"
      :desc="getSongDescText(song)"
      @click.native="onSongSelect(musicList, index)"
    >
    </SongListItem>
  </ul>
</template>

<script>
import SongListItem from "./SongListItem";

export default {
  props: {
    musicList: {
      type: Array,
      default() {
        return [];
      }
    },
    rank: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    // 播放选择歌曲
    onSongSelect(songs, index) {
      this.$emit("select", songs, index);
    },

    // 拼接音乐介绍文本
    getSongDescText({ singer = "未知", album = "未知" }) {
      return `${singer} - ${album}`;
    }
  },

  components: {
    SongListItem
  }
};
</script>

<style lang="scss" scoped>
.music-list_list {
  padding-top: 10px;
  background-color: $color-background;
}
</style>
