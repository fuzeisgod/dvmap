<template>
  <div>
    <p class="dv-user-title">
      用户
      <span>{{searchText}}</span> 管理设备
    </p>
    <div v-for="(item, index) in dvList" :key="index" class="dvList-item">
      <i class="el-icon-place"></i>
      {{item.label}}
    </div>
  </div>
</template>

<script>
export default {
  props: ["searchText"],
  data() {
    return {
      dvList: [
        {
          id: "1",
          label: "设备1"
        },
        {
          id: "2",
          label: "设备2"
        },
        {
          id: "3",
          label: "设备3"
        },
        {
          id: "4",
          label: "设备4"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.dv-user-title {
  padding: 3px 10px;
  color: #606266;
  span {
    color: cornflowerblue;
    font-weight: bold;
  }
}
.dvList-item {
  padding: 8px 8px;
  color: #606266;
  display: flex;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  i{
    margin-right: 5px;
  }
}
.dvList-item:hover {
  background: #eeeeee;
}
</style>