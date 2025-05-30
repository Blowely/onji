import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      react({
        // Only enable fast refresh in development
        fastRefresh: !isProduction,
      }),
      svgr(),
      // Visualizer for bundle analysis (only in production)
      isProduction && visualizer({
        open: false,
        filename: 'bundle-analyzer.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    
    // Development server configuration
    server: {
      port: 3007,
      strictPort: true,
      // Enable faster HMR
      hmr: {
        overlay: true,
      },
    },

    // Build configuration
    build: {
      outDir: 'build',
      sourcemap: isProduction ? false : 'inline',
      minify: isProduction ? 'esbuild' : false,
      
      // Rollup options
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('@ant-design') || id.includes('antd')) {
                return 'vendor-antd';
              }
              return 'vendor-other';
            }
          },
        },
      },
      
      // Terser options for better minification
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: true,
        },
      },
      
      // Enable CSS code splitting
      cssCodeSplit: true,
      
      // Set chunk size warning limit (in kbs)
      chunkSizeWarningLimit: 1000,
    },
    
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        // Add other frequently used dependencies here
      ],
      // Force dependency pre-bundling
      force: false,
    },
    
    // Resolve configuration
    resolve: {
      alias: {
        // Add any path aliases you're using in your project
        '@': '/src',
      },
    },
  };
});
