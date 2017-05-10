<template>
  <div @click.self='changeDatePicker' id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      datePicker:true
    }
  },
  created() {
  },
  methods: {
    changeDatePicker() {
      this.$store.dispatch('saveDP',true);
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
  -webkit-overflow-scrolling: touch;

}
</style>
