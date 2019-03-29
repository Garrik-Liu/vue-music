<template>
  <transition name="list-fade">
    <div
      class="playlist"
      v-show="showPlaylist"
      @click.stop.self="$emit('close-playlist')"
    >
      <div class="list-wrapper">
        <div class="list-header">
          <h1 class="title">
            <i
              class="icon"
              :class="iconMode"
              @click="onModeClick"
            ></i>
            <span class="text">{{ modeText }}</span>
            <span class="clear"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <ScrollView
          class="list-content"
          :data="playList"
          ref="playlistScroll"
        >
          <ul>
            <li
              class="item"
              v-for="(item, index) in playList"
              :key="item.mid"
              :ref="'songItem' + item.mid"
              @click="setCurrentIndex(index)"
            >
              <i
                class="current"
                :class="getCurrentIcon(item)"
              ></i>
              <span
                class="text"
                :class="getCurrentText(item)"
              >{{ item.name }}</span>
              <span class="like">
                <i class="icon-favorite"></i>
              </span>
              <span
                class="delete"
                @click="onSongDelete(index)"
              >
                <i class="icon-delete"></i>
              </span>
            </li>
          </ul>
        </ScrollView>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div
          class="list-close"
          @click.stop="$emit('close-playlist')"
        >
          <span>关闭</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ScrollView from "components/base/ScrollView";
import { PLAY_MODE as playModeList } from "common/js/config";

export default {
  props: {
    showPlaylist: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconMode() {
      return this.playMode === playModeList.sequence
        ? "icon-sequence"
        : this.playMode === playModeList.loop
        ? "icon-loop"
        : "icon-random";
    },

    modeText() {
      return this.playMode === playModeList.sequence
        ? "顺序播放"
        : this.playMode === playModeList.loop
        ? "单曲循环"
        : "随机播放";
    },

    ...mapGetters(["playList", "playMode", "playSong"])
  },

  watch: {
    playSong() {
      this.$nextTick(() => {
        let songId = this.playSong.mid;
        this.$refs.playlistScroll &&
          this.$refs.playlistScroll.scrollToElement(
            this.$refs["songItem" + songId][0],
            1000,
            -100
          );
      });
    }
  },

  methods: {
    onModeClick() {
      let currentMode = this.playMode;
      // 把 playMode 的 key 转换成数组, 获得长度
      let modeListArr = Object.keys(playModeList);
      let nextMode = currentMode + 1;

      // playMode 的值是从 0 开始依次向后递增的,
      // 如果大于长度减一, 则 playMode 的值变成最开始的值
      if (nextMode > modeListArr.length - 1) {
        nextMode = playModeList[modeListArr[0]];
      }

      this.setMode(nextMode);
    },

    getCurrentIcon(item) {
      if (this.playSong.mid === item.mid) {
        return "icon-play";
      }
      return "";
    },

    getCurrentText(item) {
      if (this.playSong.mid === item.mid) {
        return "text--current";
      }
      return "";
    },

    onSongDelete(index) {
      let playlist = this.playList.concat();
      playlist.splice(index, 1);

      this.setplayList(playlist);
    },

    ...mapMutations({
      setFullScreen: "SET_FULLSCREEN",
      setPlaying: "SET_PLAYING",
      setplayList: "SET_PLAYLIST",
      setCurrentIndex: "SET_PLAY_INDEX",
      setMode: "SET_PLAY_MODE"
    })
  },

  components: {
    ScrollView
  }
};
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;

  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 300ms;

    .list-wrapper {
      transition: all 300ms;
    }
  }

  &.list-fade-enter,
  &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }

  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: $color-highlight-background;

    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;

      .title {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          font-size: 30px;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .clear {
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }

    .list-content {
      max-height: 240px;
      overflow: hidden;

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;

        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme;
        }

        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;

          &--current {
            color: $color-text;
          }
        }

        .like {
          padding: 7px;
          font-size: $font-size-small;
          color: $color-theme;

          .icon-favorite {
            color: $color-sub-theme;
          }
        }

        .delete {
          position: relative;
          right: -7px;
          padding: 7px;
          font-size: $font-size-small;
          color: $color-theme;
        }
      }
    }

    .list-operate {
      width: 140px;
      margin: 20px auto 30px auto;

      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;

        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }

        .text {
          font-size: $font-size-small;
        }
      }
    }

    .list-close {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>
