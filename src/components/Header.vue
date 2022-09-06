<template>
  <div class="list-box">
    <ul class="list">
      <li
        class="item"
        v-for="(item, index) in type === 'SFC' ? TSXlist : SFClist"
        :key="index"
        :class="{ active: active === item.path }"
        @click="jump(item)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, toRefs, Ref } from "vue";
import { useRouter } from "vue-router";
interface ListInterface {
  title: string;
  path: string;
}
export default {
  props: {
    //使用props接收的值，必须指定类型
    type: {
      type: String,
    },
  },
  setup(props: any) {
    let { type } = toRefs(props);
    const router = useRouter();

    let active: Ref<string> = computed(() => router.currentRoute.value.path);

    const SFClist: ListInterface[] = [
      { title: "主页", path: "/" },
      {
        title: "列表页",
        path: "/list",
      },
      {
        title: "element-ui页",
        path: "/element",
      },
      {
        title: "生命周期页",
        path: "/life-cycle",
      },
        {
        title: "合成营销图",
        path: "/marketing-map",
      },
    ];

    const TSXlist: ListInterface[] = [
      { title: "主页", path: "/index-tsx" },
      {
        title: "列表页-tsx",
        path: "/list-tsx",
      },
      {
        title: "element-ui页-tsx",
        path: "/element-tsx",
      },
    ];

    const jump = (item: ListInterface) => {
      router.push(item.path);
    };
    return {
      type,
      active,
      SFClist,
      TSXlist,
      jump,
    };
  },
};
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
