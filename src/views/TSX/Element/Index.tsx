import { defineComponent, h  } from "vue";
import { ElNotification } from "element-plus";
export default defineComponent({
  name: "Element",
  setup() {
    const open1 = () => {
      ElNotification({
        title: "Title",
        message: h("i", { style: "color: teal" }, "This is a reminder"),
      });
    };

    const open2 = () => {
      ElNotification({
        title: "Prompt",
        message: "This is a message that does not automatically close",
        duration: 0,
      });
    };
    return {
      open1,
      open2,
    };
  },

  render() {
    return (
      <div>
        <el-button plain onClick={this.open1}>
          Closes automatically
        </el-button>
        <el-button plain onClick={this.open2}>
          Won't close automatically
        </el-button>
      </div>
    );
  },
  // setup() {
  //   const msg = ref('msg')

  //   return {
  //     msg
  //   }
  // },
  // render() {
  //   return (
  //     <div>
  //       这个是TSX
  //       {{ msg }}
  //     </div>
  //   )
  // }
});
