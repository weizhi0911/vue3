import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Children",
  setup(props: any, context) {
    const open = () => {
      context.emit("change", "子组件数据");
    };

    return {
      open,
    };
  },
  render() {
    return (
      <div>
        <el-button type="primary" onClick={this.open}>
          点击触发子组件emit事件（子传父）
        </el-button>
        <slot name="item" text="'hello from child'"></slot>
      </div>
    );
  },
});
