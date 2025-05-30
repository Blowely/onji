import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// Create a function to get plugins
const getPlugins = () => {
  const plugins = [
    react({
      // Only enable fast refresh in development
      fastRefresh: process.env.NODE_ENV !== 'production',
    }),
    svgr(),
  ];

  // Only load visualizer when ANALYZE env is set
  if (process.env.ANALYZE) {
    const { visualizer } = require('rollup-plugin-visualizer');
    plugins.push(visualizer({
      open: false,
      filename: 'bundle-analyzer.html',
      gzipSize: true,
      brotliSize: true,
    }));
  }

  return plugins;
};

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: getPlugins(),
    
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
      // Disable sourcemaps in production for faster builds
      sourcemap: false,
      // Disable minification in development for faster builds
      minify: isProduction ? 'esbuild' : false,
      // Enable faster build with esbuild for minification
      target: 'esnext',
      // Disable brotli size reporting for faster builds
      brotliSize: false,
      
      // Rollup options - simplified for faster builds
      rollupOptions: {
        output: {
          manualChunks: {
            // Group large dependencies into separate chunks
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'antd-vendor': ['antd', '@ant-design/icons'],
            // Add other large dependencies here if needed
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
    
    // Optimize dependencies - disable force pre-bundling for faster builds
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
      ],
      // Disable force pre-bundling for faster builds
      force: false,
      // Enable esbuild optimizations
      esbuildOptions: {
        target: 'es2020',
      },
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
