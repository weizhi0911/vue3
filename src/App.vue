<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Header from '@/components/Header.vue'

export default {
  name:'App',
  components: {
    Header
  },
  setup() {
    return {}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
