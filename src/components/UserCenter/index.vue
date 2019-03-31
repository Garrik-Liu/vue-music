<template>
  <transition name="slide">
    <div class="user-center">
      <div
        class="back"
        @click="back"
      >
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <Switches
          :data="switchList"
          @switch="onSwitchChange"
          :currentIndex="currentSwitchIndex"
        ></Switches>
      </div>
      <div
        class="list-wrapper"
        ref="listWrapper"
      >
        <ScrollView
          class="list-scroll"
          :data="likedMusic"
          v-if="currentSwitchIndex === 0"
        >
          <div class="list-inner">
            <SongList
              :musicList="likedMusic"
              @select="onMusicSelect"
            ></SongList>
          </div>
        </ScrollView>
        <ScrollView
          class="list-scroll"
          v-if=" currentSwitchIndex === 1"
          :data="playHistory"
        >
          <div class="list-inner">
            <SongList
              :musicList="playHistory"
              @select="onMusicSelect"
            ></SongList>
          </div>
        </ScrollView>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ScrollView from "components/base/ScrollView";
import Switches from "components/common/Switches";
import SongList from "components/common/SongList";

export default {
  data() {
    return {
      switchList: ["我喜欢的", "最近听的"],
      currentSwitchIndex: 0
    };
  },

  computed: {
    ...mapGetters(["playHistory", "likedMusic"])
  },

  methods: {
    back() {
      this.$router.back();
    },

    onSwitchChange(index) {
      this.currentSwitchIndex = index;
    },

    onMusicSelect(musicList, index) {
      this.insertSongToList(musicList[index]);
    },

    ...mapActions(["insertSongToList"])
  },

  components: {
    Switches,
    ScrollView,
    SongList
  }
};
</script>

<style lang="scss">
.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .switches-wrapper {
    margin: 10px 0 30px 0;
  }

  .list-wrapper {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;

    .list-inner {
      padding: 0px 10px 80px;
    }
  }

  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
