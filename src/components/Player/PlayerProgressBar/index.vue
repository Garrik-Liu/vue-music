<template>
  <div
    class="progress-bar"
    ref="progressBar"
  >
    <div class="bar-inner">
      <div
        class="progress"
        :style="{width: progressWidth + 'px'}"
        ref="progress"
      ></div>
      <div
        class="progress-btn-wrapper"
        :style="{left: -15 + progressWidth + 'px'}"
        ref="progressBtn"
        @touchstart="progressTouchStart"
        @touchmove="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      progressWidth: 0
    };
  },

  props: {
    percent: {
      type: Number,
      default: 0
    }
  },

  watch: {
    // 进度条百分比
    percent() {
      if (this.percent >= 0 && !this.touch.initiated) {
        let barWidth = this.$refs.progressBar.clientWidth;
        this.progressWidth = Math.ceil((barWidth * this.percent) / 100);
      }
    }
  },

  created() {
    this.touch = {};
  },

  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startProgressWidth = this.progressWidth;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },

    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }

      let deltaX = e.touches[0].pageX - this.touch.startX;

      let newProgressWidth = this.touch.startProgressWidth + deltaX;

      if (newProgressWidth < 0) {
        newProgressWidth = 0;
      } else if (newProgressWidth > this.$refs.progressBar.clientWidth) {
        newProgressWidth = this.$refs.progressBar.clientWidth;
      }

      this.progressWidth = newProgressWidth;
    },

    progressTouchEnd() {
      let progressBarWidth = this.$refs.progressBar.clientWidth;
      let progressWidth = this.progressWidth;
      let percent = Math.ceil((progressWidth / progressBarWidth) * 100);
      this.$emit("percentChange", percent);
      this.touch.initiated = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 2px/2px;

    .progress {
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      top: -13px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      .progress-btn {
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
