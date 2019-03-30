<template>
  <ScrollView
    ref="suggest"
    class="suggest"
    :data="result"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-for="item in result"
        :key="item.id"
        @click="$emit('song-select', item)"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">{{ item.name + ' - ' + item.singer }}</p>
        </div>
      </li>
    </ul>
    <div class="result-wrapper">
      <Loading v-show="!result.length"></Loading>
      <div
        class="no-result"
        v-show="!result.length"
      >
        <p>抱歉，暂无搜索结果</p>
      </div>
    </div>
  </ScrollView>
</template>

<script>
import ScrollView from "components/base/ScrollView";
import Loading from "components/common/Loading";

export default {
  data() {
    return {};
  },

  props: {
    result: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  components: {
    ScrollView,
    Loading
  }
};
</script>

<style lang="scss" scoped>
.suggest {
  .suggest-list {
    padding-left: 25px;
    padding-right: 35px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;

      &:last-of-type {
        padding-bottom: 80px;
      }
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        @include no-wrap();
      }
    }
  }

  .result-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;

    .no-result {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
    }
  }
}
</style>
