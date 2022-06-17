<template>
  <div class="block">
    <span class="demonstration">默认不区分颜色</span>
    <el-rate v-model="value1"></el-rate>
  </div>
  <div class="block">
    <span class="demonstration">区分颜色</span>
    <el-rate v-model="value2" :colors="colors"></el-rate>
  </div>
</template>

<script lang="ts">
import { ref, Ref } from 'vue'
export default {
  name:"Element",
  setup() {
    let value1: Ref<number | null> = ref(null)
    let value2: Ref<number | null> = ref(null)
    let colors: Ref<string[]> = ref(['#99A9BF', '#F7BA2A', '#FF9900'])

    return { value1, value2, colors }
  }
}
</script>
