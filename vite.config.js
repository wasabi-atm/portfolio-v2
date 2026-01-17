import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        // Output to dist folder
        outDir: 'dist',

        // Build JS bundle
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'js/main.js')
            },
            output: {
                // Single bundle file
                entryFileNames: 'js/bundle.js',
                chunkFileNames: 'js/[name].js',
                assetFileNames: '[name][extname]'
            }
        },

        // Don't clear outDir (preserve CSS)
        emptyOutDir: false,

        // Generate sourcemaps for debugging
        sourcemap: true,

        // Use esbuild for minification (built-in, faster)
        minify: 'esbuild'
    },

    // Target modern browsers
    esbuild: {
        target: 'es2020',
        drop: ['console', 'debugger']
    }
});
