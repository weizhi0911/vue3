<template>
  <ul>
    <li v-for="item in list" :key="item">{{ item }}</li>
  </ul>
</template>

<script lang="ts">
export default {
  setup() {
    const list: string[] = [
      '这是第一条数据',
      '这是第二条数据',
      '这是第三条数据'
    ]

    return {
      list
    }
  }
}
</script>

<style scoped lang="sass">
ul
  width: fit-content
  margin: 0 auto
</style>
