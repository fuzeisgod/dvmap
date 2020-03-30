<template>
  <div class="dv-index">
    <div class="dv-header">
      <el-button
        type="primary"
        icon="el-icon-switch-button"
        plain
        style="height:100%;float:right;"
        @click="$router.push({path:'/login'})"
      >退出登录</el-button>
    </div>
    <div class="dv-container">
      <div class="dv-list">
        <div class="dv-list-search">
          <dv-list-search @click="search" @change="change"></dv-list-search>
        </div>
        <div class="dv-list-tree">
          <template v-if="parseInt(searchType)===1">
            <dv-list-tree :searchText="searchText"></dv-list-tree>
          </template>
          <template v-else-if="parseInt(searchType)===2">
            <dv-list-user :searchText="searchText"></dv-list-user>
          </template>
        </div>
      </div>
      <div class="dv-map">
        <div class="dv-map-title">
          <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="实时路径" name="first"></el-tab-pane>
            <el-tab-pane label="历史路径" name="second">
              <div class="dv-map-time-block">
                <el-form>
                  <el-form-item label="查询时间段">
                    <el-date-picker
                      v-model="value"
                      type="datetimerange"
                      :picker-options="pickerOptions"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      align="right"
                      :unlink-panels="true"
                    ></el-date-picker>
                    <el-button type="primary">查询</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
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
import dvListUser from "@/components/dv-list-user/dv-list-user";
import { DatePicker, Form, FormItem, Button, Tabs, TabPane } from "element-ui";
export default {
  data() {
    return {
      searchText: "",
      activeName: "first",
      searchType: 1,
      value: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  components: {
    dvListSearch,
    dvListTree,
    dvListUser,
    [DatePicker.name]: DatePicker,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane
  },
  methods: {
    search(e) {
      this.searchText = e;
      console.log(e);
    },
    change(e) {
      this.searchType = e;
    },
    handleClick(tab, event) {}
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
    height: 50px;
    box-sizing: border-box;
  }
  .dv-container {
    flex: 1;
    display: flex;
    .dv-list {
      flex: 1;
      min-width: 250px;
      display: flex;
      border-top: 1px solid #dcdfe6;
      flex-direction: column;
      .dv-list-search {
        box-sizing: border-box;
      }
      .dv-list-tree {
        flex: 1;
      }
    }
    .dv-map {
      flex: 4;
      position: relative;
      padding: 40px 0 0 0;
      .dv-map-title {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
        .dv-map-time-block {
          padding: 10px 20px 0 20px;
        }
      }
      .map-container {
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
    font-size: 12px;
    justify-content: center;
    align-items: center;
  }
}
/* 表单元素样式 */
/deep/.el-form-item {
  margin-bottom: 10px !important;
}
</style>