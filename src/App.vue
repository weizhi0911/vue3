<template>
    <template v-if="!$route.meta.isHideHeader">
      <el-button class="checked" type="primary" @click="checkedMode">
      切换到 {{ type }} 模式
    </el-button>
    <Header :type="type" />
    </template>
  
    <router-view></router-view>
</template>
<script lang="ts">
import { computed, Ref } from "vue";
import { useRouter } from "vue-router";

import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  setup() {
    const { currentRoute, push } = useRouter();

    const type: Ref<string> = computed(() => {
      const path = currentRoute.value.path;

      return path.indexOf("tsx") !== -1 ? "SFC" : "TSX";
    });
    const checkedMode = () => {
      type.value = type.value === "TSX" ? "SFC" : "TSX";
      if (type.value === "TSX") {
        push("/index-tsx");
      } else {
        push("/");
      }
    };
    return { type, checkedMode };
  },
};
</script>

<style  lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
  
</style>

<style scoped lang="sass">
  .checked
    position: absolute
    left: 10px
    top: 10px
    z-index: 10
</style>
