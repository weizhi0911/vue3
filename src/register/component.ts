import { defineAsyncComponent } from 'vue';
const componentsArr = [import.meta.glob('../components/business/global/*.vue'), import.meta.glob('../components/global/*.vue')]; // 异步方式

export default function install(app) {
  componentsArr.map(item => {
    for (const [key, value] of Object.entries(item)) {
      const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
      app.component(name, defineAsyncComponent(value));
    }
  })
}
