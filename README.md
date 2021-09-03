# Vue 3 + Typescript + Vite + element-plus

**此项目已被 <u>[vercel](https://vercel.com/)</u> 托管，地址： [https://vue3-five.vercel.app/](https://vue3-five.vercel.app/)**

* 注意：
  1. Vue3.0过滤器已被弃用，建议用computed或方法代替过滤器
  

## 关于使用 elementui-plus，打包报错 Cannot find name 'global'

**解决方案：执行命令添加 --skipLibCheck**

```js
    "build": "vue-tsc --noEmit --skipLibCheck && vite build",
```
