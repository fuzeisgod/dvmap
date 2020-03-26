<template>
  <div class="tree-box">
    <el-tree
      :data="data"
      :props="defaultProps"
      node-key="id"
      default-expand-all
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      @node-contextmenu="handleNodeClick_right"
      ref="tree"
    ></el-tree>
    <div v-show="$store.state.menuVisible">
      <ul id="menu">
        <li @click="addSon" v-show="selectedNode.level === 1">添加设备</li>
        <li @click="remove">删除节点</li>
      </ul>
    </div>
    <el-dialog title="添加设备信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="设备ID">
          <el-input v-model="form.terminalID" clearable></el-input>
        </el-form-item>
        <el-form-item label="节点名称">
          <el-input v-model="form.nodeName" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Tree, Dialog, Button, Form, Input, FormItem } from "element-ui";
export default {
  data() {
    return {
      dialogVisible: false,
      data: [
        {
          id: 1,
          label: "区域 1",
          children: [
            {
              id: 4,
              label: "设备 1-1"
            }
          ]
        },
        {
          id: 2,
          label: "区域 2",
          children: [
            {
              id: 5,
              label: "设备 2-1"
            },
            {
              id: 6,
              label: "设备 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "区域 3",
          children: [
            {
              id: 7,
              label: "设备 3-1"
            },
            {
              id: 8,
              label: "设备 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      selectedNode: {
        level: "",
        data: "",
        node: ""
      },
      form: {
        terminalID: "",
        nodeName: ""
      }
    };
  },
  props: ["searchText"],
  components: {
    [Tree.name]: Tree,
    [Dialog.name]: Dialog,
    [Button.name]: Button,
    [Form.name]: Form,
    [Input.name]: Input,
    [FormItem.name]: FormItem
  },
  watch: {
    searchText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    handleNodeClick(data) {
      this.$store.commit("closeMenuVisible");
      console.log(data);
    },
    handleNodeClick_right(event, data, node) {
      this.selectedNode.data = data;
      this.selectedNode.node = node;
      this.selectedNode.level = node.level;
      this.$store.commit("openMenuVisible");
      let menu = document.querySelector("#menu");
      menu.style.top =
        event.pageY -
        (parseInt(process.env.VUE_APP_HEADER_HEIGHT) +
          parseInt(process.env.VUE_APP_SELECT_HEIGHT) +
          parseInt(process.env.VUE_APP_INPUT_HEIGHT)) +
        "px";
      menu.style.left = event.pageX + 20 + "px";
    },
    addSon() {
      this.dialogVisible = true;
    },
    cancelAdd() {
      this.dialogVisible = false;
    },
    confirmAdd() {
      this.dialogVisible = false;
      let data = {
        id: this.form.terminalID,
        label: this.form.nodeName
      };
      this.$refs.tree.append(data, this.selectedNode.data);
      console.log(this.data);
    },
    remove() {
      this.$refs.tree.remove(this.selectedNode.data);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>

<style lang="scss" scoped>
.tree-box {
  width: 100%;
  height: 100%;
  position: relative;
  #menu {
    border: 1px solid #abadb3;
    width: 150px;
    position: absolute;
    box-shadow: 0 0 1px #fff;
    li {
      list-style: none;
      padding: 3px 5px;
      font-size: 14px;
      cursor: pointer;
      background: #fff;
    }
    li:hover {
      background: cornflowerblue;
      color: #fff;
    }
  }
}
</style>