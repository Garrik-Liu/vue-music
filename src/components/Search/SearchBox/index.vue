<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input
      ref="query"
      v-model.lazy.trim="query"
      class="box"
      :placeholder="placeholder"
      @change="blur"
    />
    <i
      @click="clear"
      v-show="query"
      class="icon-dismiss"
    ></i>
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手"
    },

    outerQuery: String
  },

  data() {
    return {
      query: ""
    };
  },

  watch: {
    query() {
      if (this.query !== "") {
        this.insertHistory(this.query);
      }

      this.$emit("query-change", this.query);
    },

    outerQuery() {
      this.query = this.outerQuery;
    }
  },

  methods: {
    clear() {
      this.query = "";
      this.$emit("clear");
    },

    blur() {
      this.$refs.query.blur();
    },

    ...mapActions(["insertHistory"])
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: $color-highlight-background;
  border-radius: 6px;

  .icon-search {
    font-size: 24px;
    color: $color-background;
  }

  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    border: none;
  }

  .icon-dismiss {
    font-size: 16px;
    color: $color-background;
  }
}
</style>
