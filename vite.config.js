import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

const endpointData = {
  mockUrl: 'http://localhost:3000',
  endpoints: ['state', 'image', 'images']
}

export default defineConfig({
  plugins: [preact()],
  server: {
    proxy: endpointData.endpoints.reduce((accumulator, currentValue) => {
      accumulator[`/api/${currentValue}`] = { target: endpointData.mockUrl }
      return accumulator
    }, {})
  }
})
