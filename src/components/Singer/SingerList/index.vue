<template>
  <div class="singer-list_root">
    <Loading
      class="loading"
      v-show="loading"
    ></Loading>
    <ScrollView
      class="singer-list_scroll"
      :probeType="probeType"
      :data="data"
      ref="singerList"
      @scroll="onScroll"
    >
      <!-- 歌手列表 -->
      <ul>
        <li
          class="singer-list_group"
          v-for="group in data"
          :key="group.title"
          ref="group"
        >
          <!-- 依照姓氏拼音首字母排序列表 -->
          <h2 class="singer-list_group_title">{{ group.title }}</h2>
          <ul>
            <SingerItem
              v-for="item in group.items"
              :key="item.avatar"
              :data="item"
              @click.native="$emit('select', item)"
            ></SingerItem>
          </ul>
        </li>
      </ul>
    </ScrollView>

    <!-- 滚动时显示当前所在字母位置 -->
    <div
      class="singer-list_top"
      v-show="topTitleShow"
    >
      <h2 class="singer-list_top_title">{{ currentTitle }}</h2>
    </div>

    <!-- 屏幕右边首字母快速索引列表 -->
    <LetterBar
      :data="shortcutList"
      :currentIndex="currentIndex"
      @touchstart="onLetterTouchStart"
      @touchmove="onLetterTouchMove"
    ></LetterBar>
  </div>
</template>

<script>
import ScrollView from "components/base/ScrollView";
import LetterBar from "components/common/LetterBar";
import Loading from "components/common/Loading";
import SingerItem from "./SingerItem";

export default {
  data() {
    return {
      probeType: 3,
      currentIndex: 0,
      // 在顶部的当前字母位置是否显示
      topTitleShow: false,
      loading: true
    };
  },

  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  computed: {
    // 快捷字母条的数据
    shortcutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1);
      });
    },

    // 当前所在字母索引
    currentTitle() {
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : "";
    }
  },

  watch: {
    data() {
      // 当传入数据变化时, 重新计算每个歌手子列表高度
      this.$nextTick(() => {
        this.calcuGroupHeight();
      });

      if (this.data.length > 0) {
        this.loading = false;
      }
    }
  },

  created() {
    // 与用户触摸相关变量
    this.touch = {
      touchStartIndex: undefined, // 字母索引列表中第一个被触碰元素的 Index
      pageY_1: 0, // 字母索引列表中第一个被触碰的元素的 PageY
      pageY_2: 0 // 字母索引列表中正在被触碰的元素的 PageY
    };

    this.groupPositions = [];
  },

  methods: {
    // 点击指定字母时, 跳转到对应子列表
    onLetterTouchStart(e, index) {
      let target = e.touches[0];
      this.touch.pageY_1 = target.pageY;
      this.touch.touchStartIndex = index;
      this.scrollToElement(this.$refs.group[index]);
    },

    // 拖动字母条时, 列表随之跳转
    onLetterTouchMove(e, letterItemHeight) {
      let target = e.touches[0];
      this.touch.pageY_2 = target.pageY;
      let deltaY = this.touch.pageY_2 - this.touch.pageY_1;
      let deltaIndex = Math.floor(deltaY / letterItemHeight);
      let targetIndex = this.touch.touchStartIndex + deltaIndex;
      this.scrollToElement(this.$refs.group[targetIndex]);
    },

    // ScrollView 跳转到指定位置
    scrollToElement(target) {
      this.$refs.singerList.scrollToElement(target, 0);
    },

    // 当 ScrollView 滚动时
    onScroll(pos) {
      let y = 0 - pos.y;

      // 如果滚动内容超过可视区域则, 显示顶部字母栏
      if (y > 0) {
        this.topTitleShow = true;
      } else if (y <= 0) {
        this.topTitleShow = false;
      }

      this.groupPositions.forEach((item, index) => {
        if (y >= item) {
          this.currentIndex = index + 1;
        } else if (index === 0 && y < item) {
          this.currentIndex = index;
        }
      });
    },

    calcuGroupHeight() {
      // 计算每个首字母歌手列表的高度
      let groupHeights = this.$refs.group.map(item => {
        return item.clientHeight;
      });

      // 计算每个首字母歌手列表距离整个列表顶部的垂直距离
      this.groupPositions.push(groupHeights[0]);
      groupHeights.reduce((prev, next) => {
        this.groupPositions.push(prev + next);
        return prev + next;
      });
    }
  },

  components: {
    ScrollView,
    LetterBar,
    SingerItem,
    Loading
  }
};
</script>

<style lang="scss" scoped>
.singer-list_root {
  position: relative;
  height: 100%;

  .loading {
    margin-top: 100px;
  }
}

.singer-list_scroll {
  background: $color-background;
}

.singer-list_group {
  padding-bottom: 30px;

  &:last-of-type {
    padding-bottom: 80px;
  }
}

.singer-list_group_title {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: $font-size-small;
  color: $color-text-l;
  background: $color-highlight-background;
}

.singer-list_top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.singer-list_top_title {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: $font-size-small;
  color: $color-text-l;
  background: $color-highlight-background;
}
</style>
