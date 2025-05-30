import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// Only load visualizer when ANALYZE env is set
const getPlugins = (isProduction) => {
  const plugins = [
    // Disable React fast refresh in production
    react({
      fastRefresh: !isProduction,
      // Disable babel in development for faster builds
      babel: {
        babelrc: false,
        configFile: false,
        // Only enable babel for production builds
        ...(isProduction ? {
          plugins: [
            ['@babel/plugin-transform-runtime', { useESModules: true }],
            ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
          ]
        } : {})
      },
    }),
    // SVGR with minimal configuration
    svgr({
      svgrOptions: {
        icon: true,
      },
    })
  ];

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
  const isDev = !isProduction;

  return {
    plugins: getPlugins(isProduction),
    
    // Development server configuration
    server: {
      port: 3007,
      strictPort: true,
      // Enable faster HMR
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3007,
        overlay: isDev,
      },
      // Enable filesystem caching
      fs: {
        strict: false,
      },
    },

    // Build configuration
    build: {
      outDir: 'build',
      // Disable sourcemaps for faster builds
      sourcemap: false,
      // Use esbuild for faster minification
      minify: isProduction ? 'esbuild' : false,
      // Target modern browsers for smaller bundle size
      target: 'es2020',
      // Disable brotli size reporting for faster builds
      brotliSize: false,
      // Disable sourcemaps for CSS
      cssCodeSplit: true,
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 2000,
      
      // Rollup options for better code splitting
      rollupOptions: {
        // Disable module side effects for better tree shaking
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'antd-vendor': ['antd', '@ant-design/icons'],
            // Add other large dependencies here
          },
          // Better chunk naming for better caching
          chunkFileNames: isProduction
            ? 'assets/js/[name]-[hash].js'
            : 'assets/js/[name].js',
          entryFileNames: isProduction
            ? 'assets/js/[name]-[hash].js'
            : 'assets/js/[name].js',
          assetFileNames: isProduction
            ? 'assets/[ext]/[name]-[hash][extname]'
            : 'assets/[ext]/[name][extname]',
        },
      },
      
      // Minification options
      terserOptions: {
        compress: {
          // Remove console.log in production
          drop_console: isProduction,
          drop_debugger: true,
          // More aggressive optimizations
          pure_funcs: isProduction ? ['console.info', 'console.debug'] : [],
        },
        format: {
          comments: false,
        },
        mangle: {
          safari10: false,
        },
      },
    },
    
    // Optimize dependencies
    optimizeDeps: {
      // Only pre-bundle direct dependencies
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'antd',
        '@ant-design/icons',
        // Add other heavy dependencies here
      ],
      // Disable force pre-bundling for faster builds
      force: false,
      // Enable esbuild optimizations
      esbuildOptions: {
        target: 'es2020',
        // Additional optimizations
        minify: isProduction,
        treeShaking: true,
        // Define global constants
        define: {
          'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
        },
      },
    },
    
    // Resolve configuration
    resolve: {
      alias: [
        // Auto-import React in all files
        { find: 'react', replacement: 'react' },
        // Path aliases
        { find: '@', replacement: '/src' },
        // Add other aliases as needed
      ],
      // Faster module resolution
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    },
    
    // CSS optimization
    css: {
      modules: {
        // Faster class name generation in development
        generateScopedName: isDev
          ? '[name]__[local]'
          : '[hash:base64:5]',
      },
      // Disable sourcemaps for CSS
      devSourcemap: false,
      // PostCSS configuration
      postcss: {
        plugins: [
          require('autoprefixer')({
            // Browser compatibility settings
            overrideBrowserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          }),
        ],
      },
    },
  };
});
