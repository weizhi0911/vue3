<template>
  <div id="app">
    <el-button class="checked" type="primary" @click="checkedMode">
      切换到 {{ type }} 模式
    </el-button>
    <Header />
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'

import Header from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  setup() {
    const type: Ref<string> = ref('TSX')
    const router = useRouter()

    const checkedMode = () => {
      type.value = type.value === 'TSX' ? 'SFC' : 'TSX'

      if (type.value === 'TSX') {
        router.push('/')
      } else {
        router.push('/tsx-index')
      }
    }
    return { type, checkedMode }
  }
}
</script>

<style scoped lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

  .checked
    position: absolute
    left: 10px
    top: 10px
    z-index: 10
</style>
