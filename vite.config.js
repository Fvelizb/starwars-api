import { defineConfig } from 'vite';

export default defineConfig({
  // Otras configuraciones
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-bootstrap',
      // Otros paquetes que estés utilizando
    ],
  },
});
