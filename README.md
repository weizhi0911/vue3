# Vue 3 + Typescript + Vite + element-plus

## 关于使用elementui-plus，打包报错Cannot find name 'global'
解决方案：执行命令添加 --skipLibCheck
```js
    "build": "vue-tsc --noEmit --skipLibCheck && vite build",
```
