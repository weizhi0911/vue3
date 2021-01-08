<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  <!-- <HelloWorld2 msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <modal />
  <div v-if="loading">.....Loading</div>
  <img v-if="loaded" :src="result.message" />

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserUrlAxioa from './Hooks/UserUrlAxioa'
import HelloWorld from './components/HelloWorld.vue';
// import HelloWorld2 from './components/HelloWorld2.vue'
import modal from "./components/Modal.vue";
export default defineComponent({
  name: 'App',
  setup() {
    const { result, loaded, loading } = UserUrlAxioa('https://dog.ceo/api/breeds/image/random')
    return {
      result,
      loaded,
      loading,
    }
  },
  components: {
    HelloWorld,
    // HelloWorld2,
    modal
  },
})
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
