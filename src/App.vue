<template>
  <div id="app">
    <Header :title="title"></Header>
    <Tab :tabs="tabs"></Tab>
  </div>
</template>

<script>
import Header from "components/common/Header";
import Tab from "components/common/Tab";

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
    Tab
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
</style>
