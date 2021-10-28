import { defineComponent, ref, Ref } from "vue";
import './index.sass'

export default defineComponent({
  name: "List",
  setup() {
    const list: Ref<{ name: string; link: string }[]> = ref([
      {
        name: "element",
        link: "/element-tsx",
      },
      {
        name: "index",
        link: "/index-tsx",
      },
    ]);
    return { list };
  },
  render() {
    const list = this.list.map((item: { name: string; link: string }) => {
      return (
        <el-link href={item.link} target="_blank">
          {item.name}
        </el-link>
      );
    });
    return <div class="list">{list}</div>;
  },
});
