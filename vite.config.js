import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import vue2Jsx from '@vitejs/plugin-vue2-jsx';

export default ({ mode }) => {
  const { VITE_PORT, VITE_BASE_URL, VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL, VITE_MODE } = loadEnv(
    mode,
    process.cwd(),
  );

  const logProxyRealPath = (path) => {
    if (VITE_MODE === 'local') {
      console.log('经proxy middleware后路径:', path);
    } else {
      console.log(VITE_MODE);
    }
    return path;
  };
  return defineConfig({
    base: VITE_BASE_URL,
    plugins: [vue2(), vue2Jsx()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@c': resolve(__dirname, 'src/components'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'sh-padding': '10px',
            'sh-panel-padding': '10px',
            hack: `true; @import (reference) "${resolve('src/style/variables.less')}";`,
          },
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      // 监听所有地址
      host: true,
      // 服务启动时是否自动打开浏览器
      open: false,
      // 允许跨域
      cors: true,
      secure: false,

      // 自定义代理规则
      proxy: {
        // [VITE_PROXY_DOMAIN]: {
        //   target: VITE_PROXY_DOMAIN_REAL,
        //   changeOrigin: true,
        //   ws: true,
        //   rewrite: logProxyRealPath,
        // },
        '/user/api': {
          target: VITE_PROXY_DOMAIN_REAL,
          changeOrigin: true,
          ws: true,
          rewrite: logProxyRealPath,
        },
      },
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
    },
  });
};
