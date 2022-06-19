<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,html{
  padding: 0;
  margin: 0;
  background-color: #c5d5d0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  width: 1920px;
  padding: 0;
}
</style>
