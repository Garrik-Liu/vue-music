<template>
  <div class="loading_root">
    <img
      width="24"
      height="24"
      src="./loading.gif"
    >
    <p class="loading_desc">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "正在载入"
    }
  }
};
</script>

<style lang="scss" scoped>
.loading_root {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading_desc {
  line-height: 20px;
  font-size: $font-size-small;
  color: $color-text-l;
}
</style>
