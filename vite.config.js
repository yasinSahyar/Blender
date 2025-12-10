import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import { resolve } from 'path'

export default defineConfig({
  // Bu ayar, public klasöründeki varlıkların kök dizinle eşleşmesini sağlar.
  base: '/', 
  
  build: {
    // Vite'a, model dosyalarını doğrudan URL olarak ele almasını söyle
    assetsInclude: ['**/*.glb']
  }
})