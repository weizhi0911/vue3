<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>欢迎光临浪漫洗浴中心</h2>
    <div>请选择以为美女为你服务</div>
    <div>
      <button v-for="(item, index) in girls"
              :key="index"
              @click="selectGirFun(index)">
        {{ item }}
      </button>
    </div>

    <div>你选择了{{ selectGirls }}为你服务</div>
    <div><button @click="overActive">点餐完毕</button></div>
    <div>{{ overText }}</div>
  </div>
</template>

<script lang="ts">
// reactive() 优化代码
// toRefs包装一下data使data里的值变为响应式，可以在模板里使用
import {
  reactive,
  toRefs,
  ref,
  // onBeforeMount,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onBeforeUnmount,
  // onUnmounted,
  // onActivated,
  // onDeactivated,
  // onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  watch,
  watchEffect
} from "vue";

interface DataPros {
  girls: string[];
  selectGirls: string;
  selectGirFun: (index: number) => void;
}
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    console.log("页面开始创建---》setup()");
    // 不能让ts有类型推断(指ts自己推断出类型)
    const data: DataPros = reactive({
      girls: ["大脚", "刘英", "晓红"],
      selectGirls: "大脚",
      selectGirFun: (index: number) => {
        data.selectGirls = data.girls[index];
      },
    });
    // const girls = ref(["大脚", "刘英", "晓红"])
    // const overText = ref("红浪漫");
    // const overActive = () => {
    //   overText.value = "点餐完成" + overText.value;
    // };
    // watch([overText, () => data.selectGirls], (n, o) => { // watch监听，没有初始化监听,可加属性immediate deep 
    //   // selectGirls用get型方法，考虑到vue2，渐进式开发
    //   console.log(n);
    //   console.log(o);
    //   document.title = n[0];
    // },{
    //     deep: true,
    //     immediate:true
    //   });
  //*watchEffect*   注意它与watch的区别：

  // 1、watch 是需要传入侦听的数据源，而 watchEffect 是自动收集数据源作为依赖。

  // 2、watch 可以访问侦听状态变化前后的值，而 watchEffect 没有。

  // 3、watch 是属性改变的时候执行，而 watchEffect 是默认会执行一次，然后属性改变也会执行。
    // watchEffect(() => { // 初始化监听并且改变的时候也会监听
    //   console.log(overText.value, '改变')
    // })
    // 变量赋值取值需要用value进行取值赋值,在template模板里的话不用value
    // const selectGirFun =(index: number) => {
    //   selectGirls.value = girls.value[index];
    // }

    // 生命周期
    // setup可以代替初始化之前和初始化之后

    // onBeforeMount(() => {
    //   // 组件挂载前
    //   console.log("组件挂载前--》onBeforeMount");
    // });

    // onMounted(() => {
    //   // 组件挂载后
    //   console.log("组件挂载后--onMounted");
    // });

    // onBeforeUpdate(() => {
    //   // 组件跟新后之前
    //   console.log("组件跟新后之前-onBeforeUpdate");
    // });

    // onUpdated(() => {
    //   // 组件跟新之后
    //   console.log("组件跟新之后--onUpdated");
    // });

    // onBeforeUnmount(() => {
    //   // vue2是beforeDestroy
    //   // 组件销毁之前
    //   console.log("组件销毁之前--onBeforeUnmount");
    // });
    // onUnmounted(() => {
    //   // 组件销毁之后
    //   console.log("组件销毁之后--onUnmounted");
    // });
    // onActivated(() => {
    //   // 跟<keep-alive></keey-alive>配合使用
    //   // 组件活跃时触发
    // });

    // onDeactivated(() => {
    //   // 跟<keep-alive></keey-alive>配合使用
    //   // 组件不活跃时触发
    // });

    // onErrorCaptured(() => {
    //   // 捕获子组件异常时触发的函数
    // });

    onRenderTracked((event) => {
      // 响应式跟踪(所有响应式状态)
      console.log("状态跟踪钩子函数------->>>>>>>>");
      console.log(event);
    });
    onRenderTriggered((event) => {
      // 单个响应式跟踪
      console.log("单个状态跟踪钩子函数-->>>>>>>>");
      console.log(event);
    });
    return {
      // 不使用的变量不需要return
      ...toRefs(data),
      // overText,
      // overActive
      // 包装一下data使data里的值变为响应式，可以在模板里使用
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
 