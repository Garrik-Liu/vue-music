<template>
  <div class="recommend_list">
    <h1 class="recommend_list_title">热门歌单推荐</h1>

    <Loading v-if="loading"></Loading>

    <div class="recommend_list_list">
      <ul>
        <li
          class="recommend_list_item"
          v-for="item in data"
          :key="item.imgurl"
          @click="$emit('select', item)"
        >
          <div class="list_item_img">
            <img v-lazy="item.imgurl">
          </div>
          <div class="list_item_text-group">
            <h2 class="list_item_title">{{ item.dissname }}</h2>
            <p class="list_item_desc">{{ item.creator.name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loading from "components/common/Loading";

export default {
  data() {
    return {
      loading: true
    };
  },

  props: {
    data: {
      type: Array
    }
  },

  watch: {
    data() {
      if (this.data.length > 0) {
        this.loading = false;
      }
    }
  },

  components: {
    Loading
  }
};
</script>

<style lang="scss" scoped>
$iconImgWidth: 60px;

.recommend_list {
  display: flex;
  flex-direction: column;
}

.recommend_list_title {
  height: 65px;
  line-height: 65px;
  text-align: center;
  font-size: $font-size-medium;
  color: $color-theme;
}

.recommend_list_item {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 0 20px 20px 20px;

  &:last-of-type {
    padding-bottom: 80px;
  }

  .list_item_img {
    flex: 0;
    padding-right: 20px;

    img {
      width: $iconImgWidth;
    }
  }

  .list_item_text-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    font-size: $font-size-medium;
  }

  .list_item_title {
    margin-bottom: 10px;
    color: $color-text;
    @include no-wrap();
  }

  .list_item_desc {
    color: $color-text-d;
    @include no-wrap();
  }
}
</style>
