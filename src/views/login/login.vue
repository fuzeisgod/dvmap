<template>
  <div>
    <login-background></login-background>
    <div class="login-content">
      <div class="login-box">
        <div class="login-box-header">
          <h1>{{ current === "loginBoxLogin"?'登录':'注册' }}</h1>
          <p @click="cur">{{ current === "loginBoxLogin"?'没有账号？点击注册':'已有账号，点击登录' }}</p>
        </div>
        <component :is="current"></component>
      </div>
    </div>
  </div>
</template>

<script>
import loginBackground from "@/components/login-background/login-background";
export default {
  data() {
    return {
      current: "loginBoxLogin"
    };
  },
  components: {
    loginBackground,
    loginBoxLogin: () => import("@/components/login-box/login-box-login"),
    loginBoxRegister: () => import("@/components/login-box/login-box-register")
  },
  methods: {
    cur() {
      if (this.current === "loginBoxLogin") {
        this.current = "loginBoxRegister";
      } else if (this.current === "loginBoxRegister") {
        this.current = "loginBoxLogin";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .login-box {
    width: 400px;
    margin: 200px auto;
    background: rgba($color: #ffffff, $alpha: 0.7);
    padding: 20px 30px 30px 20px;
    border-radius: 4px;
    box-shadow: 0 0 10px #ccc;
    .login-box-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      p {
        font-size: 13px;
        color: cornflowerblue;
        cursor: pointer;
      }
    }
  }
}
</style>