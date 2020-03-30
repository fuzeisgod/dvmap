<template>
  <div class="tree-box">
    <div class="addArea" @click="dialogVisible_area=true">
      <i class="el-icon-circle-plus-outline"></i>添加区域
    </div>
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
    <!-- 添加设备 -->
    <el-dialog
      title="添加设备"
      :visible.sync="dialogVisible_device"
      :before-close="handleClose_device"
      width="30%"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="设备ID">
          <el-input v-model="form.terminalID" clearable></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="form.nodeName" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作人员">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd_device">取 消</el-button>
        <el-button type="primary" @click="confirmAdd_device">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加区域 -->
    <el-dialog
      title="添加区域"
      :visible.sync="dialogVisible_area"
      :before-close="handleClose_area"
      width="30%"
    >
      <el-form :model="area" label-width="80px">
        <el-form-item label="区域ID">
          <el-input v-model="area.areaID" clearable></el-input>
        </el-form-item>
        <el-form-item label="区域名称">
          <el-input v-model="area.areaName" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd_area">取 消</el-button>
        <el-button type="primary" @click="confirmAdd_area">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  Tree,
  Dialog,
  Button,
  Form,
  Input,
  FormItem,
  MessageBox
} from "element-ui";
export default {
  data() {
    return {
      dialogVisible_device: false,
      dialogVisible_area: false,
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
        nodeName: "",
        name: "",
        phone: ""
      },
      area: {
        areaID: "",
        areaName: ""
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
    [FormItem.name]: FormItem,
    [MessageBox.name]: MessageBox
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
      this.dialogVisible_device = true;
    },
    cancelAdd_device() {
      this.dialogVisible_device = false;
    },
    cancelAdd_area() {
      this.dialogVisible_area = false;
    },
    confirmAdd_device() {
      this.dialogVisible_device = false;
      let data = {
        id: this.form.terminalID,
        label: this.form.nodeName
      };
      this.$refs.tree.append(data, this.selectedNode.data);
    },
    confirmAdd_area() {
      this.dialogVisible_area = false;
      let node = {
        id: this.area.areaID,
        label: this.area.areaName,
        children: []
      };
      this.data.push(node);
    },
    remove() {
      MessageBox.confirm("确认删除该节点?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs.tree.remove(this.selectedNode.data);
        })
        .catch(() => {
          console.log("取消删除");
        });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleClose_device(done) {
      for (let key in this.form) {
        this.form[key] = "";
      }
      done();
    },
    handleClose_area(done) {
      for (let key in this.area) {
        this.area[key] = "";
      }
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
.tree-box {
  width: 100%;
  height: 100%;
  position: relative;
  .addArea {
    display: flex;
    align-items: center;
    font-size: 15px;
    border-bottom: 1px solid #dcdfe6;
    padding: 5px 8px;
    color: #606266;
    cursor: pointer;
    i {
      margin-right: 5px;
    }
  }
  .addArea:hover {
    background: #eeeeee;
  }
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