<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    console.log(process.env.NODE_ENV);
    console.log(APP_NAME);
    console.log(VERSION);
  },
};
</script>
<style>
@import url("./style/index.scss");
div {
  color: blue;
  background-color: white;
}
</style>
