<template>
  <div>{{ msg }}</div>

  <div>
    <span>事件：</span>
    <span class="add" @click="addCount">点击我数字+1</span>
    ----
    <span class="del" @click="delCount">点击我数字-1</span>
    ----
    <span>（{{ count }}）</span>
  </div>

  <div>
    <span>watch：</span>
    <span id="watch-node">未变化</span>
  </div>
</template>

<script lang="ts">
import { ref, Ref, watch, nextTick } from 'vue'
export default {
  setup() {
    const msg: string = '我是主页'
    let count: Ref<number> = ref(0)
    const addCount = () => {
      count.value++
    }
    const delCount = () => {
      count.value--
    }

    watch(
      count,
      async (val: number) => {
        console.log(val)
        await nextTick()
        let node= <HTMLElement>document.querySelector('#watch-node')
        node.innerText = '变化的值为' + val
      },
      {
        immediate: true
      }
    )
    return {
      msg,
      count,
      addCount,
      delCount
    }
  }
}
</script>

<style scoped lang="sass">
.add
  cursor: pointer
</style>
