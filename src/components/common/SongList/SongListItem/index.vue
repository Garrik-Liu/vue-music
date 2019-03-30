<template>
  <li class="music-list_item_root">
    <MusicListIcon
      :value="index + 1"
      v-if="rank"
    ></MusicListIcon>
    <div class="music-list_item_content">
      <h2 class="item_content_name">{{name}}</h2>
      <p class="item_content_desc">{{desc}}</p>
    </div>
  </li>
</template>


<script>
import MusicListIcon from "../SongListIcon";

export default {
  props: {
    name: {
      type: String,
      default: ""
    },

    desc: {
      type: String,
      default: ""
    },

    index: {
      type: Number,
      required: true
    },

    rank: {
      type: Boolean,
      default: false
    }
  },

  components: {
    MusicListIcon
  }
};
</script>

<style lang="scss" scoped>
$music-item-height: 64px;

.music-list_item_root {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: $music-item-height;
  font-size: $font-size-medium;
  margin: 0 16px;
}

.music-list_item_content {
  flex: 1;
  line-height: 20px;
  overflow: hidden;

  .item_content_name {
    color: $color-text;
    @include no-wrap();
  }

  .item_content_desc {
    margin-top: 4px;
    color: $color-text-d;
    @include no-wrap();
  }
}
</style>
