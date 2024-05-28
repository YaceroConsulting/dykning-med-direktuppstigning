/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        reporters: process.env.GITHUB_ACTIONS
            ? ['dot', 'github-actions']
            : ['dot'],
    },
})
