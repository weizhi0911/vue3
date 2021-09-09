import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import html from 'vite-plugin-html'
const path = require('path')

// https://vitejs.dev/config/

// const VITE_APP_STATIC_PATH = 'https://cdn.staticfile.org'

const cdn = {
  js: [
    'https://cdn.staticfile.org/vue/3.2.11/vue.cjs.min.js',
    'https://cdn.staticfile.org/vue-router/4.0.11/vue-router.cjs.min.js',
    'https://cdn.staticfile.org/axios/0.21.4/axios.js',
    'https://cdn.staticfile.org/element-plus/1.0.2-beta.71/index.full.min.js'
  ],
  css: [
    'https://cdn.staticfile.org/element-plus/1.0.2-beta.71/theme-chalk/base.min.css'
  ]
}
export default ({ mode }) => {
  console.log(mode)
  let externalObj = {}
  let injectScript = []
  let injectCss = []
  if (mode == 'develop' || mode == 'test' || mode == 'release') {
    // externalObj = {
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   'element-plus': 'ElementPlus'
    // }
    // injectScript = `
    // <script crossorigin="anonymous" type="text/javascript" src="${VITE_APP_STATIC_PATH}/h5-static/vue@${VueV}/vue.runtime.prod.js"></script>
    // <script crossorigin="anonymous" type="text/javascript" src="${VITE_APP_STATIC_PATH}/h5-static/vue-router@${vueRouter}/vue-router.prod.js"></script>
    // <script crossorigin="anonymous" type="text/javascript" src="${VITE_APP_STATIC_PATH}/h5-static/weixin@${weixin}/index.js"></script>
    // <script crossorigin="anonymous" type="text/javascript" src="${VITE_APP_STATIC_PATH}/h5-static/hys-static@${hysStaticJs}/static.umd.js"></script>`
  } else if (mode == 'production') {
    externalObj = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'element-plus': 'ElementPlus'
    }
    injectScript = cdn.js
    injectCss = cdn.css
    // cdn.js.map(item => (injectScript +=  `<script crossorigin="anonymous" type="text/javascript" src="${item}"></script>`))
    // cdn.css.map(item => (injectCss += `<link rel="stylesheet" type="text/css" href="${item}"/>`))
    // console.log(injectScript)
  }

  return defineConfig({
    base: './',
    // 静态资源服务的文件夹，默认public
    publicDir: 'public',
    build: {
      assetsDir: 'static/img/',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          }
        }
      }
    },
    optimizeDeps: {
      // exclude: ['vue', 'vue-router', 'axios', 'qs', 'element-plus']
    },
    plugins: [
      vue(),
      // <link href="${VITE_APP_STATIC_PATH}/h5-static/img/favicon.ico" rel="Shortcut Icon" type="image/x-icon" />

      html({
        inject: {
          injectData: {
            injectScript,
            injectCss
          }
        },
        minify: true
      })
    ],
    css: {
      // postcss: {
      //   // 样式自动添加前缀
      //   plugins: [require('autoprefixer')]
      // },
      // 引入全局 scss
      preprocessorOptions: {
        scss: {
          // additionalData: "@import './src/assets/style/mixin.scss';"
        }
      }
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      host: '0.0.0.0',
      port: 8080, // 服务器端口号
      open: true, // 是否自动打开浏览器
      // 代理
      proxy: {
        '/api': {
          target: 'http://xxx.xxx.xx',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
        '@': path.resolve(__dirname, 'src'),
        comps: path.resolve(__dirname, 'src/components')
      }
    }
  })
}
