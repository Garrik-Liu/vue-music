<template>
  <div class="button-group">
    <div
      class="button button--prev"
      @click="$emit('changeSlice', -1)"
    >
      <i>&#60;</i>
    </div>
    <div
      class="button button--next"
      @click="$emit('changeSlice', 1)"
    >
      <i>&#62;</i>
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
}
</style>
