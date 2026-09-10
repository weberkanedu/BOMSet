import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lifelog.app',
  appName: 'Log',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  backgroundColor: '#0c0e12',
};

export default config;
