<template>
  <ul>
    <li v-for="item in list" :key="item">{{ item }}</li>
  </ul>
  <div class="g-df">
    <span>Tabs组件：</span>
    <Tabs :list="tabs" @change="activeChange" />
  </div>
</template>

<script lang="ts">
import Tabs from "@/components/Tabs.vue";
import { Ref, ref } from "vue";
export default {
  components: {
    Tabs,
  },
  setup() {
    const list: string[] = [
      "这是第一条数据",
      "这是第二条数据",
      "这是第三条数据",
    ];

    const tabs: Ref<{ label: string; value: number }[]> = ref([
      {
        label: "苹果",
        value: 0,
      },
      {
        label: "梨子",
        value: 1,
      },
      {
        label: "香蕉",
        value: 2,
      },
    ]);

    const activeChange = (val: Event) => {
      console.log(val);
    };

    return {
      list,
      tabs,
      activeChange,
    };
  },
};
</script>

<style scoped lang="sass">
ul
  width: fit-content
  margin: 0 auto
</style>
