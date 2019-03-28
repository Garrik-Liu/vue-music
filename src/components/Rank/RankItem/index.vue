<template>
  <li class="rank-item_root">
    <div class="icon">
      <img
        width="100"
        height="100"
        v-lazy="picUrl"
      />
    </div>
    <ul class="rank-item_songlist">
      <li
        class="songlist_item"
        v-for="(song,index) in songList"
        :key="song.name"
      >
        <span>{{index + 1}}</span>
        <span>{{song.songname}}-{{song.singername}}</span>
      </li>
    </ul>
  </li>
</template>


<script>
export default {
  props: {
    picUrl: {
      type: String,
      default: ""
    },
    songList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$rankItem-height: 100px;
$songListItem-height: 26px;

.rank-item_root {
  display: flex;
  margin: 0 20px;
  padding-top: 20px;
  height: $rankItem-height;

  .icon {
    flex: 0 0 $rankItem-height;
    width: $rankItem-height;
    height: $rankItem-height;
  }

  .rank-item_songlist {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    height: $rankItem-height;
    overflow: hidden;
    background: $color-highlight-background;
    color: $color-text-d;
    font-size: $font-size-small;
    .songlist_item {
      @include no-wrap();
      line-height: $songListItem-height;
    }
  }
}
</style>
