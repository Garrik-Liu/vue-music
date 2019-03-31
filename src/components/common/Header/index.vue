<template>
  <div class="header-root">
    <i class="icon icon-music"></i>
    <h1 class="header-title">{{ title }}</h1>
    <router-link
      tag="div"
      class="link-mine"
      to="/user"
    >
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
$header-height: 44px;
$icon-width: 30px;

.header-root {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: $header-height;
  color: $color-theme;

  .icon {
    font-size: $font-size-large-x;
    margin-right: 5px;
  }

  .link-mine {
    position: absolute;
    top: 0;
    right: 0;

    .icon-mine {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: $color-theme;
    }
  }
}

.header-title {
  line-height: $header-height;
  font-size: $font-size-large;
}
</style>
