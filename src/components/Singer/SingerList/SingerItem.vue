<template>
  <li class="singer-item_root">
    <img
      class="singer-item_avatar"
      v-lazy="data.avatar"
    >
    <span class="singer-item_name">{{ data.name }}</span>
  </li>
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>

<style lang="scss" scoped>
.singer-item_root {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 0 0 30px;
}

.singer-item_avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.singer-item_name {
  margin-left: 20px;
  color: $color-text-l;
  font-size: $font-size-medium;
}
</style>
