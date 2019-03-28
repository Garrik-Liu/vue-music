<template>
  <div id="app">
    <Header :title="title"></Header>
  </div>
</template>

<script>
import Header from "components/common/Header";

export default {
  name: "app",

  data() {
    return {
      title: "Vue Music"
    };
  },

  components: {
    Header
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
