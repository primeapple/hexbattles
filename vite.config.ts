import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        transformMode: {
            web: [/.[jt]sx?/],
        },
        threads: false,
        isolate: false,
    },
    plugins: [solidPlugin(), viteTsConfigPaths()],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
    },
    resolve: {
        conditions: ['development', 'browser'],
    },
});
