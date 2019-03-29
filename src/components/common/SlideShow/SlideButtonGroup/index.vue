<template>
  <div class="button-group">
    <div
      class="button button--prev"
      @click="$emit('changeSlice', -1)"
    >
      <svg
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-arrow"></use>
      </svg>
    </div>
    <div
      class="button button--next"
      @click="$emit('changeSlice', 1)"
    >
      <svg
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-arrow"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  methods: {}
};
</script>

<style lang="scss" scoped>
.button-group {
  position: absolute;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .button {
    height: 100%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    transition: 200ms ease-in-out;

    &:hover {
      background-color: #000;
      opacity: 0.5;
    }
  }

  .button--prev > .icon {
    transform: rotate(90deg);
  }

  .button--next > .icon {
    transform: rotate(-90deg);
  }
}
</style>
