<template>
  <div class="hello">{{nowTime}}</div>
  <button @click="getNowTime">触发时间</button>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    const nowTime = ref('00:00:00')
    const getNowTime = () => {
      const now = new Date()
      const hour = now.getHours() < 10 ? 0 + now.getHours() : now.getHours()
      const minu =
        now.getMinutes() < 10 ? 0 + now.getMinutes() : now.getMinutes()
      const sec =
        now.getSeconds() < 10 ? 0 + now.getSeconds() : now.getSeconds()
      nowTime.value = hour + ':' + minu + ':' + sec
      setTimeout(getNowTime, 1000)
    }
    return {
      nowTime,
      getNowTime,
    }
  },
}
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
 