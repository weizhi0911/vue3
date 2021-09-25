import { defineComponent, ref } from 'vue'
// interface Props {
//   count: number
//   style: CSSProperties
// }
// type Emit = {
//   childClick: () => void
// }

export default defineComponent({
  name: 'Index',
  setup() {
    const msg = ref('m33333333333sg')
    return {
      msg
    }
  },

  render() {

    return (
      <div>
        这个是TSX
        { this.msg }
        ss
      </div>
    )
  }
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
})
