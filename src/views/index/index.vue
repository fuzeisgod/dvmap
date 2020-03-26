<template>
  <div class="dv-index">
    <div class="dv-header"></div>
    <div class="dv-container">
      <div class="dv-list">
        <div class="dv-list-search">
          <dv-list-search @click="search"></dv-list-search>
        </div>
        <div class="dv-list-tree">
          <dv-list-tree :searchText="searchText"></dv-list-tree>
        </div>
      </div>
      <div class="dv-map">
        <router-view class="map-container"></router-view>
      </div>
    </div>
    <div class="dv-bottom">
      <p>Copyright © 2018-2036 版权所有 浙江新图维电子科技有限公司</p>
    </div>
  </div>
</template>

<script>
import dvListSearch from "@/components/dv-list-search/dv-list-search";
import dvListTree from "@/components/dv-list-tree/dv-list-tree";
export default {
  data() {
    return {
      searchText: ""
    };
  },
  components: {
    dvListSearch,
    dvListTree
  },
  methods: {
    search(e) {
      this.searchText = e;
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.dv-index {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .dv-header {
    height: 100px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
  }
  .dv-container {
    flex: 1;
    display: flex;
    .dv-list {
      //   background: papayawhip;
      flex: 1;
      min-width: 250px;
      display: flex;
      flex-direction: column;
      .dv-list-search {
        // height: 50px;
        box-sizing: border-box;
      }
      .dv-list-tree {
        flex: 1;
      }
    }
    .dv-map {
      background: powderblue;
      flex: 4;
      .map-container{
        width: 100%;
        height: 100%;
      }
    }
  }
  .dv-bottom {
    height: 20px;
    box-sizing: border-box;
    border-top: 1px solid #ccc;
    display: flex;
    font-size: 13px;
    justify-content: center;
    align-items: center;
  }
}
</style>