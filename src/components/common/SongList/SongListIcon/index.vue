<template>
  <div class="song-list__icon">
    <template v-if="topOneThird">
      <img
        class="icon"
        :src="iconUrl"
        :alt="value"
      >
    </template>
    <template v-else>
      {{ value }}
    </template>
  </div>
</template>


<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ""
    }
  },

  computed: {
    topOneThird() {
      if (this.value <= 3) {
        return true;
      }

      return false;
    },

    iconUrl() {
      switch (this.value) {
        case 1:
          return require("./icons/first@2x.png");
        case 2:
          return require("./icons/second@2x.png");
        case 3:
          return require("./icons/third@2x.png");
        default:
          return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.song-list__icon {
  color: $color-theme;
  width: 25px;
  text-align: center;
  padding-right: 14px;
  margin: 0 5px;

  .icon {
    width: 100%;
  }
}
</style>
