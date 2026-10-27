import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
    plugins: [
        sveltekit({
            // Preprocessor settings
            preprocess: vitePreprocess(),

            // Static Adapter with fallback page
            adapter: adapter({
                fallback: 'index.html'
            }),

            // Inlining strategy for fully offline-ready bundling
            output: {
                bundleStrategy: 'inline'
            },

            // Hash-based client-only routing
            router: {
                type: 'hash'
            }
        }),
        // Vite single-file plugin to pack everything into a single bundle
        viteSingleFile()
    ],
    build: {
        // Ensures images, fonts, and assets are inlined as base64 URLs
        assetsInlineLimit: Infinity,
        chunkSizeWarningLimit: 100000000
    },
    resolve: {
        alias: {
            // Maps '@/' to the project root directory
            '@': path.resolve(import.meta.dirname, './src/'),
        }
    }
});
