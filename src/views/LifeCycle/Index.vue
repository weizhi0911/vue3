<template>
  <div>
    <span class="add" @click="addCount">点击我数字+1</span>
    <span>（{{ count }}）</span>
    <span>（{{ count1 }}）</span>
    <span>{{ numResult }}</span>
    生命周期('看控制台')
  </div>
</template>
>

<script lang="ts">
import {
  Ref,
  ref,
  watch,
  computed,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'
export default {
  setup() {
    let count: Ref<number> = ref(0)
    let count1: Ref<number> = ref(0)

    let numResult: Ref<number> = computed(() => {
      return count.value * 2
    })
    const addCount = () => {
      count.value++
      count1.value++
    }
    watch(
      count,
      async (val: number) => {
        console.log('watch', val)
      },
      {
        immediate: true
      }
    )

    // setup可以代替初始化之前和初始化之后

    onBeforeMount(() => {
      // 组件挂载前
      console.log('组件挂载前--》onBeforeMount')
    })

    onMounted(() => {
      // 组件挂载后
      console.log('组件挂载后--onMounted')
    })

    onBeforeUpdate(() => {
      // 组件跟新后之前
      console.log('组件跟新后之前-onBeforeUpdate')
    })

    onUpdated(() => {
      // 组件跟新之后
      console.log('组件跟新之后--onUpdated')
    })

    onBeforeUnmount(() => {
      // 组件销毁之前
      console.log('组件销毁之前--onBeforeUnmount')
    })
    onUnmounted(() => {
      // 组件销毁之后
      console.log('组件销毁之后--onUnmounted')
    })
    onActivated(() => {
      // 跟<keep-alive></keey-alive>配合使用
      // 组件活跃时触发
    })

    onDeactivated(() => {
      // 跟<keep-alive></keey-alive>配合使用
      // 组件不活跃时触发
    })

    onErrorCaptured(() => {
      // 捕获子组件异常时触发的函数
    })
    
    // 以下俩个周期，按数据依次触发
    onRenderTracked(event => {
      // 需在组件里使用
      // 渲染时触发，响应式跟踪(所有响应式状态)（数据状态包括定义的数组的length以及数组里的每个值）
      // 它会跟踪页面上所有响应式变量和方法的状态，也就是我们用return返回去的值，它都会跟踪
      console.log('状态跟踪钩子函数onRenderTracked------->>>>>>>>')
      console.log(event)
    })
    onRenderTriggered(event => {
      // 需在组件里使用
      // 单个响应式跟踪，数据改变时触发
      // 直译过来是状态触发，它不会跟踪每一个值，而是给你变化值的信息，并且新值和旧值都会给你明确的展示出来
      console.log('单个状态跟踪钩子函数onRenderTriggered-->>>>>>>>')
      console.log(event)
    })

    return { count, count1, numResult, addCount }
  }
}
</script>
