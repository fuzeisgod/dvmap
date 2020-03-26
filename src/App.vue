<template>
  <div id="app" @click="listenClick">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    listenClick() {
      this.$store.commit("closeMenuVisible");
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
