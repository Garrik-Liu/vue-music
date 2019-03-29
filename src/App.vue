<template>
  <div id="app">
    <Header
      class="app_header"
      :title="title"
    ></Header>
    <Tab
      class="app_tab"
      :tabs="tabs"
    ></Tab>
    <keep-alive>
      <router-view class="app_content"></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import Header from "components/common/Header";
import Tab from "components/common/Tab";
import Player from "components/Player";

export default {
  name: "app",

  data() {
    return {
      title: "Vue Music",
      tabs: [
        { url: "/recommend", title: "推荐" },
        { url: "/singer", title: "歌手" },
        { url: "/rank", title: "排行" },
        { url: "/search", title: "搜索" }
      ]
    };
  },

  components: {
    Header,
    Tab,
    Player
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  height: 100vh;
}

.app_content {
  flex: 1 1 auto;
  overflow: hidden;
}
</style>
