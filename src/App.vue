<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const locale = ref(zhCn);
</script>

<style lang="sass">
@import '@/assets/sass'



#app
  height: 100%
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  &>div:nth-child(2)
    height: 100%
</style>

<style scoped lang="sass">
// .g-df
//  display: flex
</style>
