<template>
  <div
    class="player"
    v-if="playSong.name"
  >
    <transition name="normal">
      <div
        class="player--normal"
        v-show="playFull"
      >
        <div class="background">
          <img
            width="100%"
            height="100%"
            :src="playSong.image"
          >
        </div>

        <div class="top">
          <div
            class="back"
            @click="back"
          >
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{ playSong.name }}</h1>
          <h2 class="subtitle">{{ formatSingers(playSong.singer) }}</h2>
        </div>

        <div
          class="middle"
          @click="onMiddleClick"
        >

          <transition name="middle-small">
            <div
              class="middle-l"
              ref="middleL"
              v-show="!toggleMiddle"
            >
              <div
                class="cd-wrapper"
                ref="cdWrapper"
              >
                <div class="cd">
                  <img
                    class="image"
                    :class="{play: playing}"
                    :src="playSong.image"
                  >
                </div>
              </div>
              <div class="playing-lyric-wrapper">
                <p class="playing-lyric">
                  {{ currentLyric }}
                </p>
              </div>
            </div>
          </transition>

          <transition name="middle-full">
            <ScrollView
              class="middle-r"
              v-show="toggleMiddle"
              :data="lyrics"
              ref="lyricScroll"
            >
              <div class="lyric-wrapper">
                <div>
                  <p
                    class="text"
                    :class="{'current': lyricIndex === index}"
                    v-for="(item, index) in lyrics"
                    :key="index"
                    ref="lyric"
                  >
                    {{ item.lyric }}
                  </p>
                </div>
              </div>
            </ScrollView>
          </transition>

        </div>

        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{ _formatSongTime(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <ProgressBar
                :percent="progressPercent"
                @percentChange="onProgressPercentChange"
              ></ProgressBar>
            </div>
            <span class="time time-r">{{ _formatSongTime(playSong.duration) }}</span>
          </div>

          <div class="operators">
            <div
              class="icon i-left"
              @click="onModeClick"
            >
              <i :class="iconMode"></i>
            </div>

            <div
              class="icon i-left"
              @click="prev"
            >
              <i class="icon-prev"></i>
            </div>

            <div
              class="icon i-center"
              @click="onPlayClick"
            >
              <i :class="playIcon"></i>
            </div>

            <div
              class="icon i-right"
              @click="next"
            >
              <i class="icon-next"></i>
            </div>

            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div
        class="player--mini"
        v-show="!playFull"
        @click="onMiniPlayerTouch"
      >
        <div class="icon">
          <img
            :class="{play: playing}"
            width="40"
            height="40"
            :src="playSong.image"
          >
        </div>
        <div class="text">
          <h2 class="name">{{ playSong.name }}</h2>
          <p class="desc">{{ formatSingers(playSong.singer) }}</p>
        </div>
        <div
          class="control"
          @click.stop="onPlayClick"
        >
          <i :class="playMiniIcon"></i>
        </div>
        <div
          class="control"
          @click.stop="showPlaylist = true"
        >
          <i class="icon-playlist"></i>
        </div>
        <Playlist
          :show-playlist="showPlaylist"
          @close-playlist="showPlaylist = false"
        ></Playlist>
      </div>
    </transition>
    <audio
      :src="playSong.url"
      ref="audio"
      @timeupdate="onAudioTimeUpdate"
      @ended="onAudioEnded"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import ProgressBar from "./PlayerProgressBar";
import Playlist from "./Playlist";
import ScrollView from "components/base/ScrollView";

import { getSongLyric } from "api/song";
import { formatSongTime } from "common/js/utils";
import { formatLyric } from "common/js/song";
import { PLAY_MODE as playModeList } from "common/js/config";

export default {
  data() {
    return {
      currentTime: 0,
      progressPercent: 0,
      progressPercentChange: false,
      lyrics: [],
      lyricIndex: 0,
      toggleMiddle: false,
      showPlaylist: false
    };
  },

  computed: {
    playIcon() {
      return this.playing ? "icon-pause" : "icon-play";
    },

    playMiniIcon() {
      return this.playing ? "icon-pause-mini" : "icon-play-mini";
    },

    currentLyric() {
      let lyric = "";
      if (this.lyrics[this.lyricIndex]) {
        lyric = this.lyrics[this.lyricIndex].lyric;
      }

      return lyric;
    },

    iconMode() {
      return this.playMode === playModeList.sequence
        ? "icon-sequence"
        : this.playMode === playModeList.loop
        ? "icon-loop"
        : "icon-random";
    },

    ...mapGetters([
      "playFull",
      "playList",
      "playing",
      "playMode",
      "playIndex",
      "playSong"
    ])
  },

  watch: {
    playSong() {
      this.setPlaying(true);

      getSongLyric(this.playSong.mid).then(res => {
        if (res.status === 200) {
          let result = [];
          this.lyricIndex = 0;
          formatLyric(res.data).forEach(item => {
            if (item) {
              result.push(item);
            }
          });

          this.lyrics = result;
        }
      });

      this.toggleMiddle = false;

      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },

    playIndex() {
      this.historyIndex.push(this.playIndex);
    },

    playing() {
      this.$nextTick(() => {
        if (this.playing) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      });
    },

    currentTime() {
      let percent = ((this.currentTime / this.playSong.duration) * 100).toFixed(
        2
      );
      this.progressPercent = parseFloat(percent);
    },

    progressPercent() {
      this.updateLyric();
    },

    lyricIndex() {
      this.$refs.lyricScroll &&
        this.$refs.lyricScroll.scrollToElement(
          this.$refs.lyric[this.lyricIndex],
          1000,
          -100
        );
    },

    toggleMiddle() {
      if (this.toggleMiddle) {
        this.$refs.lyricScroll &&
          this.$refs.lyricScroll.scrollToElement(
            this.$refs.lyric[this.lyricIndex],
            1000,
            -100
          );
      }
    }
  },

  created() {
    this.historyIndex = [];
  },

  methods: {
    back() {
      this.setPlayFull(false);
      this.showPlaylist = false;
    },

    formatSingers(singers) {
      let result = "";

      if (singers) {
        result = singers.reduce((prev, next) => {
          return prev + "/" + next;
        });
      }

      return result;
    },

    onPlayClick() {
      this.setPlaying(!this.playing);
    },

    onMiniPlayerTouch() {
      this.setPlayFull(true);
    },

    getRandomIndex() {
      let length = this.musicPlaylist.length;
      let index = Math.ceil(Math.random() * length);
      if (this.historyIndex.indexOf(index) === -1) {
        return index;
      } else {
        this.getRandomIndex();
      }
    },

    prev() {
      let index = 0;

      if (this.playMode != playModeList.random) {
        let length = this.playList.length;
        index = this.playIndex - 1;
        index = index >= 0 ? index : length - 1;
      } else {
        index = this.getRandomIndex();
      }

      this.setPlayIndex(index);
    },

    next() {
      let index = 0;

      if (this.playMode != playModeList.random) {
        let length = this.playList.length;
        index = this.playIndex + 1;
        index = index <= length - 1 ? index : 0;
      } else {
        index = this.getRandomIndex();
      }

      this.setPlayIndex(index);
    },

    _formatSongTime(time) {
      return formatSongTime(time);
    },

    onAudioTimeUpdate(e) {
      this.currentTime = e.target.currentTime;
    },

    onProgressPercentChange(newPercent) {
      let duration = this.playSong.duration;
      let newTime = (duration * newPercent) / 100;
      this.$refs.audio.currentTime = newTime;

      this.updateLyric();
    },

    updateLyric() {
      this.lyrics.forEach(({ time }, index) => {
        time = time / 1000;

        if (time - this.currentTime <= 1 && time - this.currentTime >= -1) {
          this.lyricIndex = index;
        }
      });
    },

    onModeClick() {
      let currentMode = this.playMode;
      // 把 playModeList 的 key 转换成数组, 获得长度
      let modeListArr = Object.keys(playModeList);
      let nextMode = currentMode + 1;

      // mode 的值是从 0 开始依次向后递增的,
      // 如果大于长度减一, 则 mode 的值变成最开始的值
      if (nextMode > modeListArr.length - 1) {
        nextMode = playModeList[modeListArr[0]];
      }

      this.setMode(nextMode);
    },

    onAudioEnded() {
      if (this.playMode === playModeList.sequence) {
        this.next();
      } else if (this.playMode === playModeList.loop) {
        this.$refs.audio.play();
      } else {
        this.next();
      }
    },

    onMiddleClick() {
      this.toggleMiddle = !this.toggleMiddle;
    },

    ...mapMutations({
      setPlayFull: "SET_PLAY_FULL",
      setPlaying: "SET_PLAYING",
      setPlayIndex: "SET_PLAY_INDEX",
      setMode: "SET_PLAY_MODE"
    })
  },

  components: {
    ProgressBar,
    ScrollView,
    Playlist
  }
};
</script>

<style lang="scss" scoped>
.player {
  .player--normal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;

        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        width: 80%;
        margin: 0 auto;
        @include no-wrap();
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      //white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;

          .cd {
            position: relative;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;

            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;

              &.play {
                animation: rotate 60s linear infinite;
              }
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 60px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }

        &.middle-small-enter-active,
        &.middle-small-leave-active {
          transition: all 400ms;
        }

        &.middle-small-enter,
        &.middle-small-leave-to {
          opacity: 0;
        }
      }

      .middle-r {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }
        }

        &.middle-full-enter-active,
        &.middle-full-leave-active {
          transition: all 400ms;
        }

        &.middle-full-enter,
        &.middle-full-leave-to {
          opacity: 0;
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;

          &.time-l {
            position: relative;
            left: -10px;
          }

          &.time-r {
            position: relative;
            right: -10px;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 20px;
          text-align: center;

          i {
            font-size: 40px;
          }
        }

        .i-right {
          text-align: left;
        }

        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }

    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 400ms;

      .top,
      .bottom {
        transition: all 400ms;
      }

      .middle-l {
        transition: all 1000ms ease-out;
      }

      .playing-lyric-wrapper {
        transition: transform 500ms ease-out, opacity 500ms ease 100ms;
      }
    }

    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }

      .middle-l {
        opacity: 0;
      }

      .playing-lyric-wrapper {
        transform: translate3d(0, -30px, 0);
      }
    }
  }

  .player--mini {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-highlight-background;

    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;

      img {
        border-radius: 50%;

        &.play {
          animation: rotate 10s linear infinite;
        }
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        margin-bottom: 2px;
        @include no-wrap();
        font-size: $font-size-medium;
        color: $color-text;
      }

      .desc {
        @include no-wrap();
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }

    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;

      .icon-play-mini,
      .icon-pause-mini,
      .icon-playlist {
        font-size: 30px;
        color: $color-theme-d;
      }
    }

    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 400ms;
    }

    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
      transform: translate3d(0, 100px, 0);
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
