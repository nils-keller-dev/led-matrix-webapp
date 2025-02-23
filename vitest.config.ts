import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      exclude: [
        '**/enums/**',
        '**/interfaces/**',
        '**/constants/**',
        '**/main.tsx',
        ...coverageConfigDefaults.exclude
      ]
    }
  }
})
