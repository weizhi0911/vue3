<template>
  <div class="tabs">
    <ul>
      <li
        @click="activeChange(item.value)"
        v-for="item in list"
        :key="item.value"
        :class="active === item.value ? 'active' : ''"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, Ref, toRefs } from "vue";
export default {
  name: "Tabs",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: any, context: any) {
    const { list } = toRefs(props);
    const active: Ref<number | string> = ref(0);

    const activeChange = (val: number | string) => {
      active.value = val;
      context.emit("change", val);
    };

    return { list, active, activeChange };
  },
};
</script>

<style lang="sass" scoped>
.tabs
  width: fit-content
  ul
    li
      padding: 3px 5px
      cursor: pointer
      &.active
        color: #7f57ff
</style>
