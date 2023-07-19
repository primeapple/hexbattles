import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    test: {
        environment: 'jsdom',
        transformMode: {
            web: [/.[jt]sx?/],
        },
        threads: false,
        isolate: false,
    },
    plugins: [solidPlugin()],
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
