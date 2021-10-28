<template>
  <div>{{ msg }}</div>
  <div>{{ state.nickname }}</div>

  <div>
    <span>事件：</span>
    <span class="add" @click="addCount">点击我数字+1</span>
    ----
    <span class="del" @click="delCount">点击我数字-1</span>
    ----
    <span>（{{ count }}）</span>
  </div>
  <br />
  <div>
    <span>watch：</span>
    <span id="watch-node">未变化</span>
  </div>
  <br />
  <div>
    <span>computed：</span>
    <span id="watch-node">{{ numResult }}</span>
  </div>
</template>

<script lang="ts">
import {
  ref,
  Ref,
  reactive,
  toRefs,
  watch,
  watchEffect,
  nextTick,
  computed,
} from "vue";
export default {
  setup() {
    /**
     * reactive是用于复杂数据类型。
     * 可以直接用引用进行赋值， 如果使用到了ref响应式就需要变量.value进行赋值。
     * torefs是因为把reactive的值转成ref型，如果不转就不能响应式。
     */

    const msg: string = "我是主页";
    let count: Ref<number> = ref(0);
    let numResult: Ref<number> = computed(() => {
      return count.value * 2;
    });
    const state = reactive({ nickname: "xiaofan", age: 20 });
    let year = ref(0);
    const addCount = () => {
      count.value++;
    };
    const delCount = () => {
      count.value--;
    };

    watch(
      count,
      async (val: number) => {
        await nextTick();
        let node = <HTMLElement>document.querySelector("#watch-node");
        node.innerText = "变化的值为" + val;
      },
      {
        immediate: true,
      }
    );

    setInterval(() => {
      state.age++;
      year.value++;
    }, 1000);
    // watchEffect(() => { // 会先执行一次用来自动收集依赖
    //   console.log(state)
    //   console.log(year)
    // })

    return {
      msg,
      count,
      numResult,
      state,
      addCount,
      delCount,
    };
  },
};
</script>

<style scoped lang="sass">
.add,.del
  cursor: pointer
  color: #7f57ff
</style>
