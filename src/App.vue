<template>
  <div id="app">
    <router-view :domain="domain"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      domain:"http://svn.bjdreamtech.com:10080/"
    }
  }
}
</script>

<style>
  html,body{
    height: 100%;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;

}
</style>
