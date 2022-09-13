import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx"; // 解决vue3.0使用tsx报错
const fs = require('fs')

const path = require("path");
// 获取输入目录的绝对路径
const resolve = directory => path.resolve(__dirname, directory)

export default ({ mode }) => {
  const isProduction = mode === "production";
  const env = loadEnv(mode, process.cwd(), '')

  if (mode == "develop" || mode == "test" || mode == "release") {
 } else if (mode == "production") {
  
  }

  const tsconfig = fs.readFileSync('./tsconfig.json')

  // 路径别名
  const aliasObj = {}

  const tsconfigAlias = JSON.parse(
    // 去除注释
    tsconfig.toString().replace(/\/\/.*(\r|\n|\r\n)/g, '')
  ).compilerOptions.paths

  Object.keys(tsconfigAlias).forEach(alias => {
    aliasObj[alias.replace('/*', '')] = resolve(tsconfigAlias[alias][0].replace('/*', ''))
  })

  

  return defineConfig({
    base: "./",
    // 静态资源服务的文件夹，默认public
    publicDir: "public",
    build: {
      // outDir: "", // 打包的包名 默认dist
      assetsDir: "static/img/",
      cssCodeSplit: true, // 拆分css，如果禁用则会打包成一个css
      assetsInlineLimit: 10, // 此阈值的导入或引用资源将内联为 base64 编码,设置为 0 可以完全禁用此项,单位为0
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules") && !id.includes('vue')) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    optimizeDeps: {
      // exclude: ['vue', 'vue-router', 'axios', 'qs', 'element-plus']
    },
    define: {
      'process.env': env
    },
    plugins: [
      vue(),
      vueJsx(),
      // <link href="${VITE_APP_STATIC_PATH}/h5-static/img/favicon.ico" rel="Shortcut Icon" type="image/x-icon" />

    ],
    css: {
      // 引入全局 sass
      preprocessorOptions: {
        scss: { // 预处理
          additionalData: `@import '@archSass/variables/index.sass';@import '@archSass/mixin/g_placeholder.sass';@import '@archSass/mixin/g_lineEllipsis.sass';@import "@globalSass/index.sass";`
        },
      },
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      host: "0.0.0.0",
      // port: 8080, // 服务器端口号
      open: true, // 是否自动打开浏览器
      // 代理
      proxy: {
        "/api": {
          target: env.VUE_APP_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      extensions: [".js", ".json", ".ts", ".tsx"], // 导入时想要省略的扩展名列表
      alias:aliasObj
      // alias: {
      //   // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
      //   "@": path.resolve(__dirname, "src"),
      // },
    },
  });
};
