<template>
  <div class="list-box">
    <ul class="list">
      <li
        class="item"
        v-for="(item, index) in list"
        :key="index"
        :class="{ active: active === index }"
        @click="jump(item, index)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
interface ListInterface {
  title: string
  path: string
}
export default {
  setup() {
    const router = useRouter()

    let active: Ref<number> = ref(0) // 声明变量
    const list: ListInterface[] = [
      { title: '主页', path: '/' },
      {
        title: '列表页',
        path: '/list'
      },
       {
        title: 'element-ui页',
        path: '/element'
      },
       {
        title: '生命周期页',
        path: '/life-cycle'
      }
      
    ]

    const jump = (item: ListInterface, index: number) => {
      active.value = index
      router.push(item.path)
    }
    return {
      active,
      list,
      jump
    }
  }
}
</script>

<style lang="sass" scoped>
.list-box
  position: absolute
  top: 0px
  height: 38px
  width: 100%
  .list
    display: flex
    margin: auto
    width: fit-content
    .item
      padding: 3px 5px
      height: 30px
      display: flex
      justify-content: center
      align-items: center
      cursor: pointer
      animation: all .2s
      font-size:18px
      &.active
        color: #7f57ff

      &:hover
        color: #7f57ff
</style>
