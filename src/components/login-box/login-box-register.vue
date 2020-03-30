<template>
  <div>
    <el-form label-position="right" ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item prop="account" label="账号">
        <el-input v-model="form.account" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="form.password" clearable></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input type="password" v-model="form.repassword" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" plain @click="submitForm" :loading="loading">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from "element-ui";
export default {
  data() {
    return {
      loading: false,
      form: {
        account: "",
        password: "",
        repassword: ""
      },
      rules: {
        account: [
          {
            required: true,
            type: "string",
            message: "请输入账号名称",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            type: "string",
            message: "请输入账号密码",
            trigger: "blur"
          }
        ],
        repassword: [
          {
            required: true,
            type: "string",
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.form.password) {
                callback(new Error("两次输入的密码不一致"));
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  },
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Button.name]: Button
  },
  methods: {
    submitForm() {
      this.$refs["form"].validate(valid => {
        this.loading = true;
        if (valid) {
          try {
            // 模拟请求
            setTimeout(() => {
              this.loading = false;
              this.$router.push({ path: "/" });
            }, 2000);
          } catch (err) {
            console.log(err);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-form-item {
  margin-bottom: 20px !important;
}
</style>