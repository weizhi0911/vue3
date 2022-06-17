import { defineComponent, ref, Slots } from "vue";
import Children from "./children";

export default defineComponent({
  name: "Index",
  // props: {
  //   msg: {
  //     type: String,
  //     required: true,
  //   },
  // },
  setup(props: any, context) {
    const msg = ref("m33333333333sg");
    const emitChanges = (val: string) => {
      alert(`已收到${val}`);
    };
    console.log(props);
    console.log(context);

    const transmit = () => {
      context.emit("parent", "父组件数据");
    };
    return {
      msg,
      emitChanges,
      transmit,
    };
  },

  render() {
    return (
      <div>
        这个是TSX
        {this.msg}
<<<<<<< HEAD
        <Children onChange={this.emitChanges}></Children>
=======
        <Children on-Change={this.emitChanges}></Children>
>>>>>>> master
        <el-button
          type="primary"
          style="margin-top:20px"
          onClick={this.transmit}
        >
          点击触发父组件emit事件（父传子）
        </el-button>
      </div>
    );
  },
});
