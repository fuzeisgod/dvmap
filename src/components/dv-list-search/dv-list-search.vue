<template>
  <div class="search-box">
    <div class="search-type">
      <div class="type-title">查询类型</div>
      <el-radio-group v-model="radio" @change="changeRadio">
        <el-radio label="1">设备ID</el-radio>
        <el-radio label="2">操作人员</el-radio>
      </el-radio-group>
    </div>
    <div class="search-content">
      <div class="search-input">
        <el-input
          v-model="input"
          prefix-icon="el-icon-search"
          size="small"
          clearable
          :placeholder="radio==='1'?'请输入设备ID':'请输入操作人员姓名'"
          @input="change"
        ></el-input>
      </div>
      <div class="search-btn">
        <el-button type="primary" size="small" plain @click="search">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Radio, RadioGroup, Input, Button } from "element-ui";
export default {
  data() {
    return {
      radio: "1",
      input: ""
    };
  },
  components: {
    [Radio.name]: Radio,
    [Input.name]: Input,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup
  },
  methods: {
    change() {
      this.$emit("click", this.input);
    },
    search() {
      this.$emit("click", this.input);
    },
    changeRadio(e) {
      this.$emit('change', e)
    }
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .search-type {
    box-sizing: border-box;
    display: flex;
    height: 30px;
    align-items: center;
    .type-title {
      padding: 5px 5px;
      font-size: 14px;
      color: grey;
      white-space: nowrap;
      margin-right: 10px;
    }
  }
  .search-content {
    display: flex;
    align-items: center;
    height: 32px;
    .search-input {
      flex: 1;
    }
  }
}
/deep/.el-radio-group{
  display: flex;
}
</style>